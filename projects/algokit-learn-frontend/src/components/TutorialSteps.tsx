import { TutorialStep, LineRange } from "./CodeTutorial";
import EditableFields from "./EditableFields";

interface TutorialStepsProps {
  steps: TutorialStep[];
  hoveredStep: number | null;
  clickedStep: number | null;
  stepLineRanges: LineRange[];
  fieldValues: Record<string, string>;
  onStepHover: (stepIndex: number | null) => void;
  onStepClick: (stepIndex: number) => void;
  onFieldChange: (fieldId: string, value: string) => void;
}

export default function TutorialSteps({
  steps,
  hoveredStep,
  clickedStep,
  stepLineRanges,
  fieldValues,
  onStepHover,
  onStepClick,
  onFieldChange,
}: TutorialStepsProps) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs mb-4">Hover or Click to highlight code sections</p>
      {steps.map((step, index) => (
        <div
          data-testid={
            clickedStep === index ? "active-step-tab" : `step-tab-${index}`
          }
          key={index}
          className={`p-3 transition-all duration-200 cursor-pointer rounded-t-md hover:scale-105 ${
            clickedStep === index
              ? "bg-orange-100 border-orange-300 text-brand-blue-primary"
              : "hover:bg-yellow-50 hover:text-brand-blue-primary hover:border-yellow-200 border-transparent"
          }`}
          onMouseEnter={() => onStepHover(index)}
          onMouseLeave={() => onStepHover(null)}
          onClick={() => onStepClick(index)}
        >
          <h4 className="font-bold mb-2 flex items-center gap-2">
            {index + 1} - {step.stepName}
            {step.fileReference && (
              <span className="ml-2 text-white px-2 py-0.5 rounded bg-brand-blue-primary text-xs font-mono opacity-80">
                {step.fileReference}
              </span>
            )}
          </h4>
          <p className="text-sm">{step.stepDescription}</p>

          {/* Step-specific editable fields */}
          {step.editableFields && step.editableFields.length > 0 && (
            <EditableFields
              fields={step.editableFields}
              fieldValues={fieldValues}
              onFieldChange={onFieldChange}
            />
          )}

          <p className="text-xs mt-2">
            {clickedStep === index
              ? "Copy button appears next to the highlighted code"
              : "Click to pin this highlight"}
          </p>
        </div>
      ))}
    </div>
  );
}
