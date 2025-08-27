import { PackageInfo } from "./CodeTutorial";

interface PackagesInfoProps {
  packagesInfo?: PackageInfo[];
}

export default function PackagesInfo({ packagesInfo }: PackagesInfoProps) {
  return (
    <div className="p-4 bg-brand-blue-primary space-y-4">
      <p className="text-xs text-white mb-4">
        Learn about the packages and tools used in this example
      </p>
      {packagesInfo && packagesInfo.length > 0 ? (
        packagesInfo.map((pkg, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg bg-brand-blue-primary text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-lg">{pkg.name}</h4>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                v{pkg.version}
              </span>
            </div>
            <p className="text-sm text-white mb-3">{pkg.description}</p>

            <div className="space-y-2">
              <div>
                <span className="font-medium text-sm">Purpose: </span>
                <span className="text-sm text-white">{pkg.purpose}</span>
              </div>

              <div>
                <span className="font-medium text-sm">Installation: </span>
                <code className="text-xs bg-yellow-500 text-brand-blue-primary font-bold px-2 py-1 rounded font-mono">
                  {pkg.installation}
                </code>
              </div>

              <div>
                <span className="font-medium text-sm">Documentation: </span>
                <a
                  href={pkg.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline text-sm"
                >
                  View Docs →
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center text-gray-500">
          <p>No package information available for this example.</p>
        </div>
      )}
    </div>
  );
}
