abstract class SyncStorageAdapter<T> {
	abstract get(): T | null;
	abstract set(value: T): void;
	abstract has(): boolean;
	abstract remove(): boolean;
}

abstract class AsyncStorageAdapter<T> {
	abstract get(): Promise<T | null>;
	abstract set(value: T): Promise<void>;
	abstract has(): Promise<boolean>;
	abstract remove(): Promise<boolean>;
}

export { SyncStorageAdapter, AsyncStorageAdapter };
