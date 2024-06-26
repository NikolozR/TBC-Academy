import { setSearchParams } from "../../actions";
import Button from "../shared/Button";
import FilterCheckbox from "../shared/FilterCheckbox";
import { redirect } from "next/navigation";
import { IoFilterSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import SmallFilterTopbar from "./SmallFilterTopbar";
import PriceInput from "./PriceInput";
// import PriceSlider from "./PriceSlider";

const handleCheckboxChange = async (
  filterKey: string,
  filterValue: string,
  checked: boolean,
  currentSearchParams: { [key: string]: string }[]
) => {
  const params = await setSearchParams(
    filterKey,
    filterValue,
    currentSearchParams,
    true,
    false,
    checked
  );
  redirect(`/products?${params}`);
};
const handlePriceChange = async (
  key: "min_price" | "max_price",
  val: number,
  currentSearchParams: { [key: string]: string }[]
) => {
  const params = await setSearchParams(
    key,
    val + "",
    currentSearchParams,
    false,
    false,
    false
  );
  redirect(`/products?${params}`);
};
// const handlePriceChange = async (
//   minValue: number,
//   maxValue: number,
//   currentSearchParams: { [key: string]: string }[]
// ) => {
//   'use server'
//   const updatedMinParams = await setSearchParams(
//     "min_price",
//     minValue.toString(),
//     currentSearchParams,
//     false
//   );
//   const updatedMaxParams = await setSearchParams(
//     "max_price",
//     maxValue.toString(),
//     Array.from(updatedMinParams.entries()).map(([key, value]) => ({ [key]: value })),
//     false
//   );
//   redirect(`/products?${updatedMaxParams}`);
// };

const handleReset = async () => {
  "use server";
  const params = new URLSearchParams();
  redirect(`/products?${params.toString()}`);
};

async function FilterSidebar({ brands }: { brands: string[] }) {
  const t = await getTranslations("Products");
  return (
    <>
      <SmallFilterTopbar
        brands={brands}
        categories={["headband", "earbud", "headphone"]}
      />
      <div className="hidden md:block w-[20%] mb-[100px]">
        <div className="mb-[32px] w-full flex justify-between items-center">
          <h2 className="text-[#121212] dark:text-[#F3F5F7] font-bold flex items-center gap-[8px] leading-[32px] text-[0.875rem] lg:text-[1.25rem]">
            <IoFilterSharp className="dark:hidden" />{" "}
            <IoFilterSharp color="#F3F5F7" className="hidden dark:block" />{" "}
            {t("filter")}
          </h2>
          <Button
            handleClick={handleReset}
            type="button"
            fontSize="0.8rem"
            padding="px-2 py-2"
            className="flex items-center gap-[4px] text-white dark:text-black dark:bg-white justify-between bg-black"
          >
            <FaRegTrashAlt />
            {t("clear")}
          </Button>
        </div>
        <div>
          <div>
            <h3 className="text-[#121212] dark:text-[#F3F5F7] font-bold text-[1rem] leading-[26px] mb-[12px]">
              {t("categories")}
            </h3>
            <div className="flex flex-col gap-[8px]">
              <FilterCheckbox
                filterKey="categories"
                filterValue="headband"
                handleChange={async (checked, currentParams) => {
                  "use server";
                  await handleCheckboxChange(
                    "categories",
                    "headband",
                    checked,
                    currentParams
                  );
                }}
              />
              <FilterCheckbox
                filterKey="categories"
                filterValue="earbud"
                handleChange={async (checked, currentParams) => {
                  "use server";
                  await handleCheckboxChange(
                    "categories",
                    "earbud",
                    checked,
                    currentParams
                  );
                }}
              />
              <FilterCheckbox
                filterKey="categories"
                filterValue="earphone"
                handleChange={async (checked, currentParams) => {
                  "use server";
                  await handleCheckboxChange(
                    "categories",
                    "earphone",
                    checked,
                    currentParams
                  );
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="text-[#121212] dark:text-[#F3F5F7] font-bold text-[1rem] leading-[26px] mt-[32px] mb-[12px]">
              {t("brands")}
            </h3>
            <div className="flex flex-col gap-[8px]">
              {brands?.map((brand, i) => {
                return (
                  <FilterCheckbox
                    key={i}
                    filterKey="brands"
                    filterValue={brand}
                    handleChange={async (checked, currentParams) => {
                      "use server";
                      await handleCheckboxChange(
                        "brands",
                        brand,
                        checked,
                        currentParams
                      );
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-[#121212] dark:text-[#F3F5F7] font-bold text-[1rem] leading-[26px] mt-[32px] mb-[12px]">PRICE</h3>
            <div className="flex flex-col gap-[20px]">
              <PriceInput
                filterKey="min_price"
                handleChange={async (
                  val: number,
                  currentSearchParams: { [key: string]: string }[]
                ) => {
                  "use server";
                  await handlePriceChange(
                    "min_price",
                    val,
                    currentSearchParams
                  );
                }}
              ></PriceInput>
              <PriceInput
                filterKey="max_price"
                handleChange={async (
                  val: number,
                  currentSearchParams: { [key: string]: string }[]
                ) => {
                  "use server";
                  await handlePriceChange(
                    "max_price",
                    val,
                    currentSearchParams
                  );
                }}
              ></PriceInput>
            </div>
          </div>
          {/* <PriceSlider handlePriceChange={handlePriceChange}></PriceSlider> */}
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
