import { debugLog } from "../debug";

/**
 * Represents a remote list of data which is fetched regularly whenever a local
 * cache drops under `minCacheSize` items. More items are requested from remote
 * via the `getMore` function. The initial cache is populated witg `inital`.
 */
export class VirtualList<T> {
  private cache: T[] = [];
  private awaitingResponse = false;
  private requestOffset = 0;
  private remoteEmpty = false;

  count = 0;

  constructor(
    private readonly minCacheSize: number,
    private readonly getMore: (offset: number) => Promise<T[]>,
    initial: T[] | null
  ) {
    if (initial === null) {
      this.remoteEmpty = true;
    } else {
      this.requestOffset = initial.length;
      this.cache.push(...initial);
      this.count += initial.length;
    }
  }

  private async requestMore() {
    debugLog("Requesting More Data");
    if (this.awaitingResponse) {
      debugLog("... Response already pending, abandoning request");
      return;
    }
    if (this.remoteEmpty) {
      debugLog("... Remote is empty, abandoning request");
      return;
    }

    this.awaitingResponse = true;
    debugLog("... Requesting Data");
    const additionalItems = await this.getMore(this.requestOffset);
    if (additionalItems === null) {
      debugLog("... null received, marking remote as empty.");
      this.remoteEmpty = true;
    } else {
      debugLog(`... ${additionalItems.length} items recieved.`);
      this.requestOffset += additionalItems.length;
      this.cache.push(...additionalItems);
      this.count += additionalItems.length;
    }
    this.awaitingResponse = false;
  }

  peekHead() {
    if (this.cache.length > 0) {
      return this.cache[0];
    }
    return null;
  }

  peekNext() {
    if (this.cache.length > 1) {
      return this.cache[1];
    }
    return null;
  }

  pop() {
    if (this.cache.length <= 0) {
      throw new Error("Tried to pop from a empty Virtual List");
    }
    debugLog("Popping from a virtual list");
    const result = this.cache.shift();
    if (this.cache.length < this.minCacheSize) {
      debugLog(
        `... Cache size has dipped below minCacheSize (${this.minCacheSize}), requesting more data.`
      );
      this.requestMore();
    }
    return result;
  }
}
