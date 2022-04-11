export default function (address, areas, districts) {
  try {
    //area, district
    const parsedAddress = address.toString().split(',');
    const districtInfo = districts.filter(
      e => e.name.toString().toLowerCase() ===
        parsedAddress[1].toString().trim().toLowerCase() && e
    );
    const areaInfo = areas.filter(
      (e) =>
        e.name.toString().toLowerCase() ===
        parsedAddress[0].toString().trim().toLowerCase() && e
    );
    return ({district: districtInfo[0], area: areaInfo[0]});
  } catch (e) {
    console.error(address.toString().split(','))
    console.log(e.message);
    return  e.message
  }
}
