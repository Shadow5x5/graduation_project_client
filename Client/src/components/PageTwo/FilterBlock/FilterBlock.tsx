import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../context/hook";
import ElementFilter from "../ElementFilter/ElementFilter";
import classes from "./FilterBlock.module.scss";
import {
    setSelectedManufacturers,
    setPassengerCountRange,
    setSelectedTypes,
} from "../../../store/aircraftSlice";
const FilterBlock = () => {
    const dispatch = useAppDispatch();
    const {aircraftCategories, manufacturers, maxPassengerCapacity} = useAppSelector(
        (state) => state,
    );
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState(maxPassengerCapacity);
    const [isActiveFirst, setIsActiveFirst] = useState(false);
    const [isActiveSecond, setIsActiveSecond] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    useEffect(() => {
        setSearchResults(manufacturers);
    }, [manufacturers, dispatch]);
    useEffect(() => {
        dispatch(setPassengerCountRange({min: parseInt(minValue), max: parseInt(maxValue)}));
    }, [minValue, maxValue, dispatch]);
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinValue(e.target.value);
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxValue(e.target.value);
    const toggleButtonFisrt = () => {
        setIsActiveFirst(!isActiveFirst);
    };
    const toggleButtonSecond = () => {
        setIsActiveSecond(!isActiveSecond);
    };
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        performSearch(e.target.value);
    };
    const performSearch = (term: string) => {
        if (term.length !== 0) {
            const filteredResults = manufacturers.filter((item) =>
                item.toLowerCase().startsWith(term.toLowerCase()),
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults(manufacturers);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.section1}>
                <h6 className='text'>Вид судна</h6>
                <div
                    className={`${classes.blockAircraft} ${classes.blockList} ${
                        isActiveFirst ? classes.active : ""
                    }`}>
                    {aircraftCategories.map((item) => {
                        return (
                            <ElementFilter
                                key={item}
                                textLabel={item}
                                onClick={() => {
                                    dispatch(setSelectedTypes(item));
                                }}
                            />
                        );
                    })}
                </div>
                <span
                    className={`${classes.button} ${isActiveFirst ? classes.active : ""}`}
                    onClick={toggleButtonFisrt}>
                    {!isActiveFirst ? `Показать еще ${aircraftCategories.length - 5}` : "Свернуть"}
                    <img src='./images/mark_bottom.svg' alt='' />
                </span>
            </div>
            <div className={classes.section2}>
                <h6 className='text'>Производитель</h6>
                <input
                    type='text'
                    className='background_search_4'
                    placeholder='Найти производителя'
                    onChange={handleSubmit}
                    value={searchTerm}
                />
                <div
                    className={`${classes.blockManufacturer} ${classes.blockList} ${
                        isActiveSecond ? classes.active : ""
                    }`}>
                    {searchResults.map((item) => {
                        return (
                            <ElementFilter
                                key={item}
                                textLabel={item}
                                onClick={() => {
                                    dispatch(setSelectedManufacturers(item));
                                }}
                            />
                        );
                    })}
                </div>
                <span
                    className={`${classes.button} ${isActiveSecond ? classes.active : ""}`}
                    onClick={toggleButtonSecond}>
                    {!isActiveSecond ? "Показать все" : "Свернуть"}
                    <img src='./images/mark_bottom.svg' alt='' />
                </span>
            </div>
            <div className={classes.section3}>
                <h6 className='text'>Пассажирских мест</h6>
                <div className={classes.blockInputs}>
                    <input
                        type='number'
                        placeholder='от 1'
                        className='background_search_4'
                        onChange={handleMinChange}
                    />
                    <input
                        type='number'
                        placeholder={`до ${maxPassengerCapacity}`}
                        className='background_search_4'
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBlock;
