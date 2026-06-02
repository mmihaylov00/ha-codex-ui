export function websocketEventKey(eventTypes: string[]): string {
  return [...new Set(eventTypes.filter(Boolean))].sort().join("\n");
}

export function shouldReplaceSubscriptions(
  subscribed: boolean,
  currentConnection: unknown,
  currentEventKey: string,
  nextConnection: unknown,
  nextEventKey: string,
): boolean {
  return subscribed && (currentConnection !== nextConnection || currentEventKey !== nextEventKey);
}

export function shouldKeepResolvedSubscription(
  currentGeneration: number,
  subscriptionGeneration: number,
  subscribed: boolean,
): boolean {
  return subscribed && currentGeneration === subscriptionGeneration;
}
