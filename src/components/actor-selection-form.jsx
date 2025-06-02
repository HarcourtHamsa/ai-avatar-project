import { useFetchDefaultAvatars } from "@/app/hooks/use-fetch-default-avatars";
import clsx from "clsx";
import {
  Blend,
  Heart,
  Plus,
  Search,
  User,
  Users,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const GENDERS = ["male", "female"];

const AGE = ["child", "young adult", "adult"];

const ETHNICITY = [
  "asian",
  "african american",
  "hispanic",
  "middle eastern",
  "white",
  "arab",
];

const BACKGROUNDS = [
  "home living room",
  "kitchen interior",
  "office",
  "outdoor park",
  "city street",
  "supermarket",
  "coffee shop",
  "gym",
  "digital futuristic",
  "white studio",
];

const EMOTIONS = [
  "happy",
  "sad",
  "serious",
  "surprised",
  "frustrated",
  "excited",
  "neutral",
];

const GENERAL_NAV_ITEMS = [
  {
    id: 0,
    label: "All Actors",
    icon: <Users />,
  },
  {
    id: 1,
    label: "Favourites",
    icon: <Heart />,
  },
  {
    id: 2,
    label: "Create AI Actor",
    icon: <Plus />,
  },
  {
    id: 3,
    label: "My Actors",
    icon: <User />,
  },
  {
    id: 4,
    label: "Creator Avatars",
    icon: <Blend />,
  },
];

const ActorSelectionStep = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [filters, setFilters] = useState({});

  const {
    isLoading: isFetchingDefaultAvatars,
    isError,
    error,
    data: defaultAvatars,
  } = useFetchDefaultAvatars();

  // Mobile filter states
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    gender: false,
    age: false,
    ethnicity: false,
    background: false,
    emotions: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (filter, value) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const filteredAvatars = defaultAvatars?.filter((avatar) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return avatar[key]?.toString().toLowerCase() === value.toLowerCase();
    });
  });

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-gray-200 pb-2 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left py-2"
      >
        <p className="text-gray-400 font-medium">{title}</p>
        <ChevronDown
          className={clsx(
            "w-4 h-4 text-gray-400 transition-transform",
            expandedSections[sectionKey] && "rotate-180"
          )}
        />
      </button>
      {expandedSections[sectionKey] && <div className="mt-2">{children}</div>}
    </div>
  );

  return (
    <div className="bg-white rounded-lg border">
      {/* Mobile Header with Filter Button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl">Choose Your AI Actor</h2>
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white h-full w-full max-w-sm ml-auto flex flex-col">
            {/* Mobile Filter Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Categories */}
              <FilterSection title="Categories" sectionKey="categories">
                <ul className="space-y-1">
                  {GENERAL_NAV_ITEMS.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center px-2 py-2.5 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      {item.icon}
                      <span className="">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </FilterSection>

              {/* Gender */}
              <FilterSection title="Gender" sectionKey="gender">
                <div className="flex flex-wrap gap-2">
                  {GENDERS.map((gender) => (
                    <div
                      key={gender}
                      className={clsx(
                        "flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer border text-sm",
                        selectedGender === gender &&
                          "bg-gray-200 border-gray-400"
                      )}
                      onClick={() => {
                        setSelectedGender(gender);
                        handleFilterChange("gender", gender);
                      }}
                    >
                      <span>{gender}</span>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Age */}
              <FilterSection title="Age" sectionKey="age">
                <div className="flex flex-wrap gap-2">
                  {AGE.map((age) => (
                    <div
                      key={age}
                      className={clsx(
                        "flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer border text-sm",
                        selectedAge === age && "bg-gray-200 border-gray-400"
                      )}
                      onClick={() => {
                        setSelectedAge(age);
                        handleFilterChange("age", age);
                      }}
                    >
                      <span>{age}</span>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Ethnicity */}
              <FilterSection title="Ethnicity" sectionKey="ethnicity">
                <div className="flex flex-wrap gap-2">
                  {ETHNICITY.map((ethnicity) => (
                    <div
                      key={ethnicity}
                      className={clsx(
                        "flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer border text-sm",
                        selectedEthnicity === ethnicity &&
                          "bg-gray-200 border-gray-400"
                      )}
                      onClick={() => {
                        setSelectedEthnicity(ethnicity);
                        handleFilterChange("ethnicity", ethnicity);
                      }}
                    >
                      <span>{ethnicity}</span>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Background */}
              <FilterSection title="Background" sectionKey="background">
                <div className="flex flex-wrap gap-2">
                  {BACKGROUNDS.map((background) => (
                    <div
                      key={background}
                      className={clsx(
                        "flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer border text-sm",
                        selectedBackground === background &&
                          "bg-gray-200 border-gray-400"
                      )}
                      onClick={() => setSelectedBackground(background)}
                    >
                      <span>{background}</span>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Emotions */}
              <FilterSection title="Emotions" sectionKey="emotions">
                <div className="flex flex-wrap gap-2">
                  {EMOTIONS.map((emotion) => (
                    <div
                      key={emotion}
                      className={clsx(
                        "flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer border text-sm",
                        selectedEmotion === emotion &&
                          "bg-gray-200 border-gray-400"
                      )}
                      onClick={() => setSelectedEmotion(emotion)}
                    >
                      <span>{emotion}</span>
                    </div>
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Mobile Filter Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-cPink text-white py-3 rounded-lg transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop and Mobile Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Desktop Left Sidebar - Hidden on Mobile */}
        <div className="hidden md:block col-span-1 border-r border-gray-200 px-2">
          <p className="text-xl">Choose Your AI Actor</p>
          <ul className="mt-4 border-b pb-2 border-gray-200">
            {GENERAL_NAV_ITEMS.map((item) => (
              <li
                key={item.id}
                className="flex items-center px-2 py-2.5 rounded-md cursor-pointer hover:bg-gray-100"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Desktop Gender section */}
          <div className="mt-4">
            <p className="text-gray-400">Gender</p>
            <div className="flex gap-2">
              {GENDERS.map((gender) => (
                <div
                  key={gender}
                  className={clsx(
                    "flex items-center px-2 py-2.5 rounded-lg hover:bg-gray-100 w-fit cursor-pointer border",
                    selectedGender === gender && "bg-gray-200"
                  )}
                  onClick={() => {
                    setSelectedGender(gender);
                    handleFilterChange("gender", gender);
                  }}
                >
                  <span className="">{gender}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Age section */}
          <div className="mt-4">
            <p className="text-gray-400">Age</p>
            <div className="flex flex-wrap gap-2">
              {AGE.map((age) => (
                <div
                  key={age}
                  className={clsx(
                    "flex items-center px-2 py-2.5 rounded-lg hover:bg-gray-100 w-fit cursor-pointer border",
                    selectedAge === age && "bg-gray-200"
                  )}
                  onClick={() => {
                    setSelectedAge(age);
                    handleFilterChange("age", age);
                  }}
                >
                  <span className="">{age}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Ethnicity section */}
          <div className="mt-4">
            <p className="text-gray-400">Ethnicity</p>
            <div className="flex flex-wrap gap-2">
              {ETHNICITY.map((ethnicity) => (
                <div
                  key={ethnicity}
                  className={clsx(
                    "flex items-center px-2 py-2.5 rounded-lg hover:bg-gray-100 w-fit cursor-pointer border",
                    selectedEthnicity === ethnicity && "bg-gray-200"
                  )}
                  onClick={() => {
                    setSelectedEthnicity(ethnicity);
                    handleFilterChange("ethnicity", ethnicity);
                  }}
                >
                  <span className="">{ethnicity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Background section */}
          <div className="mt-4">
            <p className="text-gray-400">Background</p>
            <div className="flex flex-wrap gap-2">
              {BACKGROUNDS.map((background) => (
                <div
                  key={background}
                  className={clsx(
                    "flex items-center px-2 py-2.5 rounded-lg hover:bg-gray-100 w-fit cursor-pointer border",
                    selectedBackground === background && "bg-gray-200"
                  )}
                  onClick={() => setSelectedBackground(background)}
                >
                  <span className="">{background}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Emotions section */}
          <div className="mt-4">
            <p className="text-gray-400">Emotions</p>
            <div className="flex flex-wrap gap-2">
              {EMOTIONS.map((emotion) => (
                <div
                  key={emotion}
                  className={clsx(
                    "flex items-center px-2 py-2.5 rounded-lg hover:bg-gray-100 w-fit cursor-pointer border",
                    selectedEmotion === emotion && "bg-gray-200"
                  )}
                  onClick={() => setSelectedEmotion(emotion)}
                >
                  <span className="">{emotion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Full width on mobile, 2/3 on desktop */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl hidden md:block">All Actors</p>

            {/* Search bar - Hidden on mobile initially, can be made visible */}
            <div className="hidden md:flex items-center gap-2 border rounded px-3 py-2 max-w-md focus-within:ring-2 focus-within:ring-orange-500">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none bg-transparent"
              />
              <Search className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mb-4">
            <div className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
              <input
                type="text"
                placeholder="Search actors..."
                className="flex-1 outline-none bg-transparent"
              />
              <Search className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Avatar Grid - Responsive */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {filteredAvatars?.map((avatar, index) => (
              <div
                key={`default-${index}`}
                className={clsx(
                  "h-[200px] md:h-[230px] bg-gray-100 rounded-lg cursor-pointer transition-all relative overflow-hidden",
                  selectedAvatar === `default-${index}`
                    ? "border-2 border-orange-500 bg-orange-100"
                    : "bg-gray-300"
                )}
                onClick={() => {
                  setSelectedAvatar(`default-${index}`);
                }}
                tabIndex={0}
              >
                <Image
                  src={avatar?.avi}
                  alt={`Default Avatar ${index}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}

            {filteredAvatars?.length === 0 && (
              <div className="col-span-full mt-4   h-[30vh] text-center text-gray-500 text-sm flex items-center justify-center">
                <div>
                  No avatars found for:{" "}
                  <span className="font-medium">
                    {Object.entries(filters)
                      .filter(([_, value]) => value)
                      .map(([_, value]) => value)
                      .join(", ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorSelectionStep;
