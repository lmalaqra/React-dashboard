export default function filterData(arr, data) {
  arr.forEach((element) => {
    switch (element) {
      case "Active":
        data.filter((customer) => customer.isActive == true);
        break;
      case "inActive":
        data.filter((customer) => !customer.isActive);
        break;
      case "onTrial":
        data.filter((customer) => customer.onTrail == true);
        break;
      case "EndedSubs":
        data.filter((customer) => customer.subEnded == true);
        break;
    }
  });
  return data;
}
