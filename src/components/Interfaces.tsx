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

export type HistoryProps = {
  id: string;
  type: string;
  radius: string | number;
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
};

export type User = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string | null;
  phoneNumber: string | null;
  providerData: (firebase.UserInfo | null)[];
};
