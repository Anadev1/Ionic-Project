import { useEffect } from "react";

let newData = [];

export default function AddressesService() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.dataforsyningen.dk/adgangsadresser`
      );
      newData = await response.json();
    };

    fetchData();
  });
  return newData;
}
