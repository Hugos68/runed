import { AsyncStorageAdapter, SyncStorageAdapter } from "./storage-adapters/StorageAdapter.js";

class Persisted<
	Value,
	Adapter extends
		| SyncStorageAdapter<Value>
		| AsyncStorageAdapter<Value> = SyncStorageAdapter<Value>,
> {
	private value = $state() as Value | null;
	private adapter: Adapter;

	constructor(adapter: Adapter) {
		this.adapter = adapter;

		if (this.adapter instanceof SyncStorageAdapter) {
			this.value = this.adapter.get();
		} else if (this.adapter instanceof AsyncStorageAdapter) {
			this.adapter.get().then((value) => {
				this.value = value;
			});
		} else {
			throw new TypeError(
				`Invalid adapter: ${this.adapter}, expected SyncStorageAdapter or AsyncStorageAdapter`
			);
		}
	}

	get current(): Value | null {
		return this.value;
	}

	set current(value: Value) {
		this.value = value;
		this.adapter.set(value);
	}
}

export { Persisted };
