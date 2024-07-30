  //changing attributes based on category
export const changeCategory = (e,categories,setAttributeFromDb,setCategoryChosen) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find(
      (cat) => cat.name === highLevelCategory
    );
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      console.log(highLevelCategoryAllData);
      setAttributeFromDb(highLevelCategoryAllData.attrs);
    } else {
      setAttributeFromDb([]);
    }
    setCategoryChosen(e.target.value);
  };

export const setAttributeWrapper = (key, val, setAttributeTable) => {
    setAttributeTable((attr) => {
      if (attr.length != 0) {
        let keyExistInTable = false;
        let modifiedTable = attr.map((item) => {
          if (item.key === key) {
            keyExistInTable = true;
            item.value = val;
            return item;
          } else {
            return item;
          }
        });
        return keyExistInTable
          ? modifiedTable
          : [...modifiedTable, { key: key, value: val }];
      } else {
        return [{ key: key, value: val }];
      }
    });
  };

//selecting value according to the attribute selected
export const setValueForAttributeKey = (e,attributeFromDb,attrvalue) => {
    if (e.target.value !== "choose attribute") {
      var selectedAttr = attributeFromDb.find(
        (item) => item.key === e.target.value
      );
      let valueForAttribute = attrvalue.current;
      if (selectedAttr && selectedAttr.value.length > 0) {
        valueForAttribute.options.length = 0;
        valueForAttribute.add(new Option("choose attribute"));
        selectedAttr.value.map((item) => {
          valueForAttribute.add(new Option(item));
        });
      }
    }
  };