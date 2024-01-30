"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import GoToTop from "./GoToTop";
import { activityLevels, fastingMethods } from "../../lib/data";
import Link from "next/link";

export default function FastingCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male"); // default to male
  const [weight, setWeight] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [measurementSystem, setMeasurementSystem] = useState("metric"); // default to metric
  const [activityLevel, setActivityLevel] = useState(activityLevels[0]); // default to first activity level
  const [method, setMethod] = useState("16/8 Split Diet");
  const [tdee, setTdee] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const isValid: boolean =
    age > 0 && weight > 0 && (heightCm > 0 || heightFeet > 0);

  useEffect(() => {
    // Load all values from localStorage
    const savedAge = localStorage.getItem("age");
    const savedGender = localStorage.getItem("gender");
    const savedWeight = localStorage.getItem("weight");
    const savedHeightCm = localStorage.getItem("heightCm");
    const savedHeightFeet = localStorage.getItem("heightFeet");
    const savedHeightInches = localStorage.getItem("heightInches");
    const savedMeasurementSystem = localStorage.getItem("measurementSystem");

    if (savedAge) setAge(Number(savedAge));
    if (savedGender) setGender(savedGender);
    if (savedWeight) setWeight(Number(savedWeight));
    if (savedHeightCm) setHeightCm(Number(savedHeightCm));
    if (savedHeightFeet) setHeightFeet(Number(savedHeightFeet));
    if (savedHeightInches) setHeightInches(Number(savedHeightInches));
    if (savedMeasurementSystem) setMeasurementSystem(savedMeasurementSystem);
  }, []);

  useEffect(() => {
    if (calculated && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
      setCalculated(false); // Reset to false after scrolling
    }
  }, [calculated]);

  const calculateFasting = () => {
    // Convert height to centimeters if the user has selected imperial
    let heightInCm =
      measurementSystem === "metric"
        ? heightCm
        : heightFeet * 30.48 + heightInches * 2.54;

    // Convert weight to kilograms if the user has selected imperial
    let weightInKg =
      measurementSystem === "metric" ? weight : weight * 0.453592;

    // Define a variable to store BMR
    let BMR;

    // Check if body fat percentage is entered to decide which formula to use
    if (bodyFat > 0) {
      // Using Katch-McArdle formula
      let leanBodyMass = weightInKg - weightInKg * (bodyFat / 100);
      BMR = 370 + 21.6 * leanBodyMass;
    } else {
      // Using Mifflin-St Jeor formula
      if (gender === "male") {
        BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else {
        BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }
    }

    // Calculate TDEE based on activity level
    let calculatedTdee = BMR * activityLevel.value;
    setTdee(calculatedTdee);

    setCalculated(true);
    return;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculateFasting();
  };
  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-200 to-gray-200 py-16 px-2">
        <div className="grid w-full grid-cols-1 place-items-center space-y-6">
          {/* measurement system */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Measurement System
            </label>
            <div className="relative flex flex-row items-center">
              <button
                onClick={() => setMeasurementSystem("imperial")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  measurementSystem === "imperial"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Imperial
              </button>
              &nbsp;
              <button
                onClick={() => setMeasurementSystem("metric")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  measurementSystem === "metric"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Metric
              </button>
            </div>
          </div>
          {/* age */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Age
            </label>
            <input
              value={age}
              id="3"
              min="1"
              max="100"
              type="number"
              onChange={(e: any) => setAge(e.target.value)}
              className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
            />
          </div>
          {/* gender */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Biological Sex
            </label>
            <div className="relative flex flex-row items-center">
              <button
                onClick={() => setGender("female")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  gender === "female"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Female
              </button>
              &nbsp;
              <button
                onClick={() => setGender("male")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  gender === "male"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Male
              </button>
            </div>
          </div>
          {/* weight */}
          <div className="group w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Weight
            </label>
            <div className="relative flex items-center">
              <input
                value={weight}
                id="9"
                type="number"
                min="1"
                onChange={(e: any) => setWeight(e.target.value)}
                className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                {measurementSystem === "metric" ? "kg" : "lbs"}
              </button>
            </div>
          </div>
          {/* height */}
          <div className="group w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Height
            </label>
            {measurementSystem === "metric" ? (
              <div className="relative flex items-center">
                <input
                  value={heightCm}
                  min="40"
                  type="number"
                  onChange={(e: any) => setHeightCm(e.target.value)}
                  className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                />
                <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                  cm
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="relative w-1/2">
                  <input
                    value={heightFeet}
                    id="9"
                    type="number"
                    min="1"
                    max="8"
                    placeholder="1-8"
                    onChange={(e: any) => setHeightFeet(e.target.value)}
                    className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                  />
                  <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    feet
                  </button>
                </div>
                &nbsp;
                <div className="relative w-1/2">
                  <input
                    value={heightInches}
                    id="9"
                    type="number"
                    min="0"
                    max="11"
                    placeholder="0-11"
                    onChange={(e: any) => setHeightInches(e.target.value)}
                    className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                  />
                  <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    inches
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* bodyFat */}
          <div className="group w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Body fat (optional)
            </label>
            <div className="relative flex flex-col items-left">
              <input
                id="9"
                type="number"
                onChange={(e: any) => setBodyFat(e.target.value)}
                className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <span className="block pt-1 text-xs font-semibold text-gray-500">
                Calculate with our free tool.
              </span>
              <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                %
              </button>
            </div>
          </div>
          {/* activity */}
          <div className="group w-[70%]">
            <label
              htmlFor="10"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Activity level
            </label>
            <div className="relative flex flex-col items-center">
              {activityLevels.map((activity, index) => (
                <div
                  key={index}
                  className={`p-2 m-2 mb-0 w-full text-base border rounded-md cursor-pointer text-black ${
                    activityLevel.label === activity.label
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                      : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                  }`}
                  onClick={() => setActivityLevel(activity)}
                >
                  {activity.label}
                </div>
              ))}
            </div>
          </div>
          {/* goal */}
          <div className="group w-[70%]">
            <label
              htmlFor="10"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Which fasting method?
            </label>
            <div className="relative flex flex-col items-center">
              {fastingMethods.map((fastingMethod, index) => (
                <div
                  key={index}
                  className={`p-2 m-2 mb-0 w-full text-base border rounded-md cursor-pointer text-black ${
                    method === fastingMethod.label
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                      : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                  }`}
                  onClick={() => setMethod(fastingMethod.label)}
                >
                  {fastingMethod.label}
                </div>
              ))}
            </div>
          </div>
          <div className="group w-[70%]">
            <CustomButton
              type="finish"
              onClick={handleSubmit}
              label="Calculate"
              className="w-full"
              disabled={!isValid}
            />
            <span className="block pt-1 text-xs font-semibold text-gray-500">
              {isValid == true ? "" : `Please input the missing values. `}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={resultRef}
        className="group w-[90%] mx-auto group flex flex-col justify-center"
      >
        {tdee > 0 ? (
          <div className="flex flex-col">
            <div className="flex justify-center">
              <h1 className="text-gradient mb-0">{method}</h1>
            </div>
            {method === "5/2 Split Diet" ? (
              <>
                <div className="">
                  <p className="mb-0 font-bold">Your Daily Calorie Goal:</p>
                  <h2 className="text-gradient my-0">
                    {tdee.toFixed(2)} kcal per day.
                  </h2>
                  <p>
                    Daily calorie goal is calculated from your TDEE with{" "}
                    <Link href="/tdee-calculator">this calculator</Link>. Number
                    of calories you use daily while doing absolutely nothing.
                    With other words - You will lose these no matter what, you
                    need them daily to maintain your current weight.
                  </p>
                </div>
                <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
                  <thead>
                    <tr className="bg-blue-500">
                      <th className="py-2 px-4 text-white text-left">Day</th>
                      <th className="py-2 px-4 text-white text-left">Diet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 1</td>
                      <td className="py-2 px-4">500-600 kcal</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 2</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 3</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 4</td>
                      <td className="py-2 px-4">500-600 kcal</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 5</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 6</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 7</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : method === "Alternate day Fasting" ? (
              <>
                <div className="">
                  <p className="mb-0 font-bold">Your Daily Calorie Goal:</p>
                  <h2 className="text-gradient my-0">
                    {tdee.toFixed(2)} kcal per day.
                  </h2>
                  <p>
                    Daily calorie goal is calculated from your TDEE with{" "}
                    <Link href="/tdee-calculator">this calculator</Link>. Number
                    of calories you use daily while doing absolutely nothing.
                    With other words - You will lose these no matter what, you
                    need them daily to maintain your current weight.
                  </p>
                </div>
                <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
                  <thead>
                    <tr className="bg-blue-500">
                      <th className="py-2 px-4 text-white text-left">Day</th>
                      <th className="py-2 px-4 text-white text-left">Diet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 1</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 2</td>
                      <td className="py-2 px-4">24-hour fasting</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 3</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 4</td>
                      <td className="py-2 px-4">24-hour fasting</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 5</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 6</td>
                      <td className="py-2 px-4">24-hour fasting</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Day 7</td>
                      <td className="py-2 px-4">Your Daily Calorie Goal*</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className="font-bold">
                  <p className="my-0">Please aim to eat:</p>
                  <h2 className="text-gradient my-0">
                    {tdee.toFixed(2)} kcal per day.
                  </h2>
                  <p>
                    You should eat one to three meals per day in a 8-hour
                    window. Choose the preferred times below.
                  </p>
                </div>
                <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
                  <thead>
                    <tr className="bg-blue-500">
                      <th className="py-2 px-4 text-white text-left">
                        Preferred times
                      </th>
                      <th className="py-2 px-4 text-white text-left">
                        Eating timeframe
                      </th>
                      <th className="py-2 px-4 text-white text-left">
                        Fasting timeframe
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Early in day</td>
                      <td className="py-2 px-4">8 AM - 4 PM</td>
                      <td className="py-2 px-4">4 PM - 8 AM next day</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Later in day</td>
                      <td className="py-2 px-4">3 PM - 11 PM</td>
                      <td className="py-2 px-4">11 PM - 7 AM next day</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-500">
                      <td className="py-2 px-4">Standard</td>
                      <td className="py-2 px-4">Noon - 8 PM</td>
                      <td className="py-2 px-4">8 PM - Noon next day</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="text-lg text-red-600">
              Please do the calculation above first.
            </p>
          </div>
        )}
        <h2>Intermittent Fasting for Weight Loss</h2>
        <p>
          Intermittent Fasting (IF) has become a key player in weight
          management. The principle is simple: alternate periods of fasting with
          eating. This switch not only helps with reducing overall calorie
          intake but also prompts the body to burn stored fat.
        </p>
        <ul>
          <li>
            Studies indicate a weight reduction between 0.8% to 13% from
            baseline.
          </li>
          <li>
            The 16/8 method, limiting food intake to 8 hours, is particularly
            effective.
          </li>
          <li>
            Exercise may enhance the benefits of IF, although individual results
            can vary.
          </li>
        </ul>
        <h2>Overview of Fasting Methods</h2>
        <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
          <thead>
            <tr className="bg-blue-500">
              <th className="py-2 px-4 text-white text-left">Fasting Method</th>
              <th className="py-2 px-4 text-white text-left">
                Key Characteristics
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-300">
                16/8 Split Diet
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <ul>
                  <li>Eating window of 8 hours with 16 hours of fasting.</li>
                  <li>Popular for its simplicity and effectiveness.</li>
                  <li>Flexible eating period can be adjusted to lifestyle.</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">
                5/2 Split Diet
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <ul>
                  <li>
                    Normal eating for 5 days, reduced calorie intake for 2
                    non-consecutive days.
                  </li>
                  <li>Typically, 500-600 calories on fasting days.</li>
                  <li>
                    Focused on calorie reduction rather than complete fasting.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">
                Alternate Day Fasting
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <ul>
                  <li>
                    Alternates between normal eating days and fasting days.
                  </li>
                  <li>
                    On fasting days, either no food or a very low-calorie diet.
                  </li>
                  <li>
                    Can lead to significant weight loss and health improvements.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Which fasting method is the best for weight loss?</h2>
        <p>
          A recent meta-analysis has compared three popular intermittent fasting
          (IF) methods: Alternate Day Fasting (ADF), the 5:2 diet, and
          Time-Restricted Eating (TRE). This study aimed to determine which
          fasting method is the most effective for weight loss.
        </p>

        <ul>
          <li>
            <strong>Effectiveness Compared to Traditional Diets:</strong> The IF
            methods showed similar weight loss effectiveness compared to
            traditional caloric restriction, making them a compelling
            alternative for those seeking new diet strategies.
          </li>
          <li>
            <strong>Ranking the Fasting Methods:</strong> The study found ADF to
            be the most effective for weight loss, followed by traditional
            calorie-restricted diets, with TRE in last place.
          </li>
          <li>
            <strong>Compliance Rates:</strong> Short-term adherence to IF diets
            started strong, with compliance rates above 80%, indicating an
            initial ease of adoption for participants.
          </li>
        </ul>

        <p>
          The conclusion points to IF, and ADF in particular, as a viable and
          potentially easier-to-follow alternative to calorie counting for
          weight loss. Longer-term studies are needed to understand the full
          scope of IF benefits and sustainability. For a more in-depth analysis,
          review the complete study in the{" "}
          <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10098946/">
            journal
          </Link>
          .
        </p>

        <h2>Will I be hungry on fasting days?</h2>
        <p>
          Reports state that the first 10 days on the every-other-day diet are
          the most challenging. Calorie-free beverages, such as unsweetened tea,
          may help offset hunger. Here are some <strong>tips</strong> for you:
        </p>
        <ul>
          <li>
            <strong>Hydrate Strategically:</strong> Keep water intake high to
            curb hunger. Spicing it up with a slice of lemon or cucumber can
            make it more enjoyable, and electrolytes can help maintain balance.
          </li>
          <li>
            <strong>Nourish with Nutrients:</strong> Incorporate a diet rich in
            fiber and proteins like legumes, lean meats, and greens.
            They&apos;re your allies in keeping hunger at bay and stabilizing
            energy levels.
          </li>
          <li>
            <strong>Smart Snacking:</strong> Choose whole foods over processed
            snacks. Foods with a low glycemic index maintain your blood sugar
            levels and fend off the cravings.
          </li>
          <li>
            <strong>Build Up Gradually:</strong> Ease into fasting by starting
            with shorter periods and then extending them. This helps your body
            adapt without overwhelming it.
          </li>
          <li>
            <strong>Engage Your Mind:</strong> Stay occupied with activities
            like reading, walking, or a new hobby. It&apos;s not just about
            passing time but enriching your life while fasting.
          </li>
          <li>
            <strong>Stay Positive and Consistent:</strong> Remember that
            perseverance is key. It&apos;s normal to have an adjustment period,
            so keep a positive mindset and be consistent with your routine.
          </li>
          <li>
            <strong>Listen to Your Body:</strong> Pay attention to what your
            body is telling you. If you feel unwell, it&apos;s okay to adjust
            your fasting plan. Health comes first.
          </li>
          <li>
            <strong>Seek Community Support:</strong> Join online forums or local
            groups practicing intermittent fasting. Sharing experiences and tips
            can be incredibly motivating.
          </li>
        </ul>

        <h2>Do I still fast once I’m ready to maintain my weight?</h2>
        <p>
          Some plans, such as the every-other-day diet, also include a weight
          maintenance phase, which involves increasing the number of calories on
          fasting days from 500 to 1,000. Other plans recommend decreasing the
          number of fasting days each week. If a person has specific conditions
          or health requirements, it may benefit them to seek consultation with
          a doctor or dietitian before starting a restrictive diet.
        </p>
        <h2>Can I eat or drink something without breaking the fast?</h2>
        <ul>
          <li>
            <strong>Stay Hydrated:</strong> Plain water is your best bet to
            avoid breaking your fast and staying hydrated.
          </li>
          <li>
            <strong>Coffee and Tea:</strong> Enjoy these beverages without sugar
            to keep the fast intact. A splash of milk may be acceptable for some
            fasting protocols, but it&apos;s best to stick to black to be safe.
          </li>
          <li>
            <strong>Savory Broths:</strong> Bone or vegetable broths can offer
            comfort without a significant calorie intake, but ensure
            they&apos;re free of solid bits.
          </li>
          <li>
            <strong>Pickles for Crunch:</strong> A pickle can be a low-calorie,
            satisfying snack. Just check the label for added sugars.
          </li>
          <li>
            <strong>Zero-Calorie Drinks:</strong> Diet sodas are often
            considered acceptable, but they can trigger a craving response in
            some people.
          </li>
          <li>
            <strong>Citrus Twist:</strong> Adding a splash of lemon juice to
            water is fine, as long as it&apos;s just a small amount.
          </li>
          <li>
            <strong>Apple Cider Vinegar:</strong> A bit diluted in water can aid
            digestion and won&apos;t break a fast.
          </li>
          <li>
            <strong>Chew Thoughtfully:</strong> Sugar-free gum can keep your
            mouth busy without adding calories.
          </li>
        </ul>
      </div>
      <GoToTop />
    </section>
  );
}
