// TODO: Ensure that the component exists at the specified path or update the import path accordingly.
import { UploadThingComponent } from "@/components/UploadThingComponent";
export default function UploadPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Upload Your File</h1>
      <UploadThingComponent />
    </div>
  );
}

