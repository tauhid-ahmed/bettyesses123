type NoEmptyString<T extends string> = T extends "" ? never : T;
