interface Location {
  lat: number | null;
  lng: number | null;
}

interface ViewPort {
  northeast: {
    lat: number | null;
    lng: number | null;
  };
  southwest: {
    lat: number | null;
    lng: number | null;
  };
}

interface OpenNow {
  open_now: boolean;
}

interface Photos {
  height: number;
  html_attributions: [];
  photo_reference: string;
  width: number;
}

export type HospitalProps = {
  html_attributions: string | null[];
  results: {
    geometry: { Location: object; ViewPort?: object };
    icon: string;
    id: string;
    name: string;
    opening_hours: OpenNow;
    photos: Photos[];
    place_id: string;
    reference: string;
    types: string[];
    vicinity: string;
  }[];
  status: string;
};

// export default interface HospitalProps Array<{
//   // results: {
//   type: string;
//   id: string;
//   score: number | null;
//   info: string;
//   entityType: string;
//   poi: POI;
//   address: Address;
//   position: Position;
//   mapcodes: Mapcodes[];
//   viewport: Viewport;
//   entryPoints: EntryPoints[];
//   addressRanges: AddressRanges;
//   dataSources: DataSources;
//   // }[];
// }>
