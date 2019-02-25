exports.processSubmitUrlsOneInp = (scriptTag, value) => {
  let submitUrl = [];
  scriptTag.shift();
  scriptTag.map(script => {
    const splitScript = script.split("'");
    const firstSecUrl = splitScript[0];
    const urlSecondItem = splitScript[splitScript.length - 2];
    splitScript.shift();
    splitScript.shift();
    splitScript.pop();
    splitScript.pop();
    splitScript.pop();
    submitUrl.push({
      url: `${firstSecUrl}\`{${value}}\`${splitScript.length > 0 ? splitScript[0] : ""}`,
      urlSecondItem
    });
  });
  return submitUrl;
};

exports.processSubmitUrlsTwoInp = (scriptTag, val1, val2) => {
  let submitUrl = [];
  scriptTag.shift();
  scriptTag.map(script => {
    const splitScript = script.split("'");
    const firstSecUrl = splitScript[0];
    const urlSecondItem = splitScript[splitScript.length - 2];
    splitScript.shift();
    splitScript.shift();
    splitScript.pop();
    splitScript.pop();
    splitScript.pop();
    submitUrl.push({
      url: `${firstSecUrl}\`{${val1}}\`${splitScript[0]}\`{${val2}}\`${
        splitScript.length > 1 ? splitScript[splitScript.length - 1] : ""
      }`,
      urlSecondItem
    });
  });
  return submitUrl;
};

exports.processSubmitUrls = (scriptTag, val, setTimeOutForSub) => {
  let submitUrl = [];
  scriptTag.shift();
  scriptTag.map(script => {
    const splitScript = script.split("'");
    const firstSecUrl = splitScript[0];
    const urlSecondItem = splitScript[splitScript.length - 2];
    splitScript.shift();
    splitScript.shift();
    splitScript.pop();
    splitScript.pop();
    splitScript.pop();
    let url = "";
    if (val.length === 1) {
      url = `${firstSecUrl}\`{${val[0]}}\`${splitScript.length > 0 ? splitScript[0] : ""}`;
    }
    if (val.length === 2) {
      url = `${firstSecUrl}\`{${val[0]}}\`${splitScript[0]}\`{${val[1]}}\`${
        splitScript.length > 1 ? splitScript[splitScript.length - 1] : ""
      }`;
    }
    if (val.length === 3) {
      url = `${firstSecUrl}\`{${val[0]}}\`${splitScript[0] ? splitScript[0] : ""}\`{${val[1]}}\`${
        splitScript[2] ? splitScript[2] : ""
      }\`{${val[2]}}\`${splitScript.length > 4 ? splitScript[splitScript.length - 1] : ""}`;
    }
    if (val.length === 5) {
      url = `${firstSecUrl}\`{${val[0]}}\`${splitScript[0] ? splitScript[0] : ""}\`{${val[1]}}\`${
        splitScript[2] ? splitScript[2] : ""
      }\`{${val[2]}}\`${splitScript[4] ? splitScript[4] : ""}\`{${val[3]}}\`${splitScript[6] ? splitScript[6] : ""}\`{${
        val[4]
      }}\`${splitScript.length > 7 ? splitScript[splitScript.length - 1] : ""}`;
    }
    submitUrl.push({
      url,
      urlSecondItem,
      setTimeOutForSub
    });
  });
  return submitUrl;
};
