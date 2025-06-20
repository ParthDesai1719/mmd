type FileMeta = {
  uuid: string;
  filename: string;
  mimetype: string;
  size: number;
  createdAt: string;
};

const metadataStore = new Map<string, FileMeta>();

export function saveMetadata(meta: FileMeta) {
  metadataStore.set(meta.uuid, meta);
}

export function getMetadata(uuid: string) {
  return metadataStore.get(uuid);
}