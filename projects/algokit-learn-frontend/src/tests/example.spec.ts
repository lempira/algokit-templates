// example.spec.ts
import { test, expect } from "@playwright/test";
import useWalletConnection from "@/tutorials/app-tutorials/wallet-connection";

// ✅ Make headed runs easier to watch + debug (top-level only)
test.use({
  viewport: { width: 1280, height: 900 },
  trace: "on-first-retry",
  video: "retain-on-failure",
});

test.use({
  video: { mode: "on", size: { width: 1280, height: 720 } },
});

const content = useWalletConnection;

test.describe("Connect Wallet tutorial", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Open home and wait for idle", async () => {
      await page.goto("http://localhost:3000", { waitUntil: "load" });
      await page.waitForLoadState("networkidle");
    });
  });

  test("Initial hero matches tutorial meta", async ({ page }, testInfo) => {
    await test.step("Verify page title", async () => {
      await expect(page).toHaveTitle("Algorand Educational Hub");
    });

    await test.step("Check hero title & description", async () => {
      const heroTitle = page.getByTestId("tutorial-title");
      const heroDesc = page.getByTestId("tutorial-description");
      await expect(heroTitle).toBeVisible();
      await expect(heroTitle).toHaveText(content.title);
      await expect(heroDesc).toBeVisible();
      await expect(heroDesc).toHaveText(content.description);
    });

    await test.step("Screenshot hero", async () => {
      await testInfo.attach("hero", {
        body: await page.screenshot(),
        contentType: "image/png",
      });
    });
  });

  test("Code area shows and default active code tab is correct", async ({
    page,
  }, testInfo) => {
    await test.step("Ensure code display is visible", async () => {
      const code = page.getByTestId("code-display");
      await expect(code).toBeVisible();
      await code.scrollIntoViewIfNeeded();
    });

    await test.step("Validate active code tab", async () => {
      const activeCodeTab = page
        .getByTestId("active-code-tab")
        .or(page.getByRole("tab", { selected: true }));
      await expect(activeCodeTab).toBeVisible();
      await expect(activeCodeTab).toContainText(content.codeTabs[0].filename);
    });

    await test.step("Screenshot code", async () => {
      await testInfo.attach("code-default", {
        body: await page.screenshot(),
        contentType: "image/png",
      });
    });
  });

  test("Clicking a step activates the correct step + code tab", async ({
    page,
  }, testInfo) => {
    const step0 = content.tutorialSteps[0];

    await test.step("Click steps with small pauses", async () => {
      const step0 = page.getByTestId("step-tab-0");
      const step1 = page.getByTestId("step-tab-1");
      const step3 = page.getByTestId("step-tab-3");

      await step0.scrollIntoViewIfNeeded();

      await step0.click();
      await page.waitForTimeout(600);

      await step1.hover();
      await page.waitForTimeout(600);

      await step3.scrollIntoViewIfNeeded();
      await step3.click();
      await page.waitForTimeout(1000);

      await step0.click();
      await page.waitForTimeout(1000);
    });

    await test.step("Check active step tab", async () => {
      const activeStep = page
        .getByTestId("active-step-tab")
        .or(page.getByRole("tab", { selected: true }));
      await expect(activeStep).toBeVisible();
      await expect(activeStep).toContainText(step0.stepName);
      await expect(activeStep).toContainText(step0.fileReference);
      // If the tab includes description:
      // await expect(activeStep).toContainText(step0.stepDescription);
    });

    await test.step("Code tab follows step's file reference", async () => {
      const activeCodeTab = page
        .getByTestId("active-code-tab")
        .or(page.getByRole("tab", { selected: true }));
      await expect(activeCodeTab).toBeVisible();
      await expect(activeCodeTab).toContainText(step0.fileReference);
    });

    await test.step("Screenshot after selection", async () => {
      await testInfo.attach("after-step-0", {
        body: await page.screenshot(),
        contentType: "image/png",
      });
    });
  });
});
