"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_TYPE, ChainTypeValue } from "../consts/chain";

const defaultValue = {
  location: {
    lat: 0,
    lng: 0,
  }
};
const CommonContext = createContext(defaultValue)

export const CommonContextProvider = ({ children }: { children: ReactNode }) => {
  const [location, setGlobalLocation] = useState(defaultValue.location);
  const setLocation = useCallback((location_: typeof defaultValue.location) => { setGlobalLocation(location_) }, [])

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator && !location.lat && !location.lng) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat: lat, lng: lng });
          // Do something with the location data, e.g. display on a map
          console.log(`Latitude: ${lat}, longitude: ${lng}`);
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLocation, location])

  return (
    <CommonContext.Provider
      value={{
        location: location
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}

export const useCommonContext = () => {
  const commonContext = useContext(CommonContext);

  return commonContext
} 