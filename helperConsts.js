const url = "https://www.zillow.com/seattle-wa/";
const abTerminator = `,"autocompleteConfig":{"address"`;
const regex = /"abTrials":{".*,"autocompleteConfig":{"address"/gm;