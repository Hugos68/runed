interface SyncStorageAdapter<T> {
	get: () => T | null;
	set: (value: T) => void;
	has: () => boolean;
	remove: () => boolean;
}

interface AsyncStorageAdapter<T> {
	get: () => Promise<T | null>;
	set: (value: T) => Promise<void>;
	has: () => Promise<boolean>;
	remove: () => Promise<boolean>;
}

export type { SyncStorageAdapter, AsyncStorageAdapter };
