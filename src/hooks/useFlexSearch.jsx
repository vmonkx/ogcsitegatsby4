import { useState, useEffect, useMemo } from "react";
import FlexSearch from "flexsearch";

export const useFlexSearch = (query, providedIndex, store) => {
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (!providedIndex && !store)
      console.warn(
        "A FlexSearch index and store was not provided. Your search results will be empty."
      );
    else if (!providedIndex)
      console.warn(
        "A FlexSearch index was not provided. Your search results will be empty."
      );
    else if (!store)
      console.warn(
        "A FlexSearch store was not provided. Your search results will be empty."
      );
  }, [providedIndex, store]);

  useEffect(() => {
    async function importIndex() {
      const importedIndex = new FlexSearch({
        split: /\s+/,
        tokenize: "reverse",
        encode: function (str) {
          var regexp_replacements = {
            a: /[àáâãäå]/g,
            e: /[èéêë]/g,
            i: /[ìíîï]/g,
            o: /[òóôõöő]/g,
            u: /[ùúûüű]/g,
            y: /[ýŷÿ]/g,
            n: /ñ/g,
            c: /[ç]/g,
            s: /ß/g,
            " ": /[-/]/g,
            "": /['!"#$%&\\()\*+,-./:;<=>?@[\]^_`{|}~]/g,
            " ": /\s+/g,
          };
          str = str.toLowerCase();
          for (var key of Object.keys(regexp_replacements)) {
            str = str.replace(regexp_replacements[key], key);
          }
          return str === " " ? "" : str;
        },
      });
      await importedIndex.import(providedIndex);
      setIndex(importedIndex);
    }

    importIndex();
  }, [providedIndex]);

  return useMemo(() => {
    if (!query || !index || !store) return [];

    const rawResults = index.search(query);

    return rawResults.map((id) => store[id]);
  }, [query, index, store]);
};
