export class BaseApi {
  protected joinFilterData = (filterData: any) => {
    let joinedFilterData = "?";
    for (const key in filterData) {
      const value = filterData[key] || null;
      joinedFilterData += key + "=" + value + "&";
    }
    return joinedFilterData;
  };
}
