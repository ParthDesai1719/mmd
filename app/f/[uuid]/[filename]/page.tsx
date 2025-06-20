// Update the import path if the file is actually at 'mmd/lib/metadata' (without .ts extension)
import { getMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = {
  params: {
    uuid: string;
    filename: string;
  };
};

export default function FilePage({ params }: Props) {
  const { uuid, filename } = params;

  const meta = getMetadata(uuid);
  if (!meta || meta.filename !== filename) {
    return notFound();
  }

  const downloadUrl = `${process.env.R2_PUBLIC_URL}/${uuid}/${filename}`;

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">📄 {meta.filename}</h1>
      <p>Size: {(meta.size / 1024).toFixed(2)} KB</p>
      <p>Uploaded: {new Date(meta.createdAt).toLocaleString()}</p>

      {meta.mimetype.startsWith("image/") && (
        <img
          src={downloadUrl}
          alt={meta.filename}
          className="max-w-lg border rounded"
        />
      )}

      {meta.mimetype === "application/pdf" && (
        <iframe
          src={downloadUrl}
          className="w-full h-96 border rounded"
        />
      )}

      <a
        href={downloadUrl}
        download
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        ⬇ Download
      </a>
    </div>
  );
}
