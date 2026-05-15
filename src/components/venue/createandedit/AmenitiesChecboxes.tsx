interface AmenitiesCheckboxesProps {
  wifi: boolean;
  breakfast: boolean;
  pets: boolean;
  parking: boolean;
  setWifi: (value: boolean) => void;
  setBreakfast: (value: boolean) => void;
  setPets: (value: boolean) => void;
  setParking: (value: boolean) => void;
}

/**
 * AmenitiesCheckboxes component that renders 4 amenities.
 *
 * Lets the user select amenities by toggling checkboxes on or off.
 * Supports wifi, breakfast, pets, and parking.
 *
 * @param wifi Whether the wifi checkbox is checked.
 * @param breakfast Whether the breakfast checkbox is checked.
 * @param pets Whether the pets checkbox is checked.
 * @param parking Whether the parking checkbox is checked.
 * @param setWifi Called when the user toggles the wifi checkbox.
 * @param setBreakfast Called when the user toggles the breakfast checkbox.
 * @param setPets Called when the user toggles the pets checkbox.
 * @param setParking Called when the user toggles the parking checkbox.
 * @returns A labeled group of 4 amenity checkboxes.
 */
export function AmenitiesCheckboxes({
  wifi,
  breakfast,
  pets,
  parking,
  setWifi,
  setBreakfast,
  setPets,
  setParking,
}: AmenitiesCheckboxesProps) {
  return (
    <>
      <p className="text-medium-text font-bold">Amenities</p>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="wifi"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
            className="h-4.5 w-4.5 cursor-pointer"
          />
          <label htmlFor="wifi">Wifi</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="breakfast"
            checked={breakfast}
            onChange={(e) => setBreakfast(e.target.checked)}
            className="h-4.5 w-4.5 cursor-pointer"
          />
          <label htmlFor="breakfast">Breakfast</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="pets"
            checked={pets}
            onChange={(e) => setPets(e.target.checked)}
            className="h-4.5 w-4.5 cursor-pointer"
          />
          <label htmlFor="pets">Pets</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="parking"
            checked={parking}
            onChange={(e) => setParking(e.target.checked)}
            className="h-4.5 w-4.5 cursor-pointer"
          />
          <label htmlFor="parking">Parking</label>
        </div>
      </div>
    </>
  );
}
