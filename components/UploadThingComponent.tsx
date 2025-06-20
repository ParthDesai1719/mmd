'use client';

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";

export function UploadThingComponent() {
  const [url, setUrl] = useState("");

  return (
    <div className="space-y-4">
      <UploadDropzone<OurFileRouter, "r2Uploader">
        endpoint="r2Uploader"
        onClientUploadComplete={(res) => {
          setUrl(res[0].serverData.url);
        }}
        onUploadError={(e) => alert(`Upload failed: ${e.message}`)}
      />
      {url && <p className="text-green-600">Uploaded: <a href={url}>{url}</a></p>}
    </div>
  );
}