export class MemoryBank {
	constructor() {
		this.memory = {};
	}

	rememberPlace(name, x, y, z, timestamp=null) {
		// timestamp is optional and used by time-sensitive places (e.g.
		// 'last_death_position') so callers can check how long ago it was
		// recorded, such as for a loot despawn window, without changing the
		// call signature for existing untimed callers.
		this.memory[name] = timestamp != null ? [x, y, z, timestamp] : [x, y, z];
	}

	recallPlace(name) {
		return this.memory[name];
	}

	getPlaceAgeMs(name) {
		// returns null if the place doesn't exist or was never timestamped
		const place = this.memory[name];
		if (!place || place.length < 4) return null;
		return Date.now() - place[3];
	}

	getJson() {
		return this.memory
	}

	loadJson(json) {
		this.memory = json;
	}

	getKeys() {
		return Object.keys(this.memory).join(', ')
	}
}
