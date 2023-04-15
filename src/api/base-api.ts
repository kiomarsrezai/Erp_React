export class BaseApi {
  joinFilterData = (filterData: any) => {
    let joinedFilterData = "?";
    for (const key in filterData) {
      const value = filterData[key];
      joinedFilterData += key + "=" + value + "&";
    }
    return joinedFilterData;
  };
}
