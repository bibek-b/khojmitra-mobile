import React from "react";

export interface OptimizedListProps<T> {
    data: T[],
    renderItem: ({item}: {item: T}) => React.ReactElement,
    keyExtractor: (item: T) => string;
    parent: string;
}