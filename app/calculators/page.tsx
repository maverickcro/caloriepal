import React from "react";
import CalculatorCard from "../components/CalculatorCard";
import AboutMeSection from "../components/AboutMeSection";

export const metadata = {
  title: "Free Calculators for Fitness Goals - CaloriePal",
  description:
    "A range of free and easy to use calculators to support your fitness journey. Macros? Calories? Weight? Calculate everything.",
  keywords: [
    "fitness calculators",
    "macros calculator",
    "calorie tracking",
    "weight management tools",
    "protein intake calculator",
    "carbs intake guide",
    "fat consumption calculator",
    "daily sugar limit tool",
    "TDEE calculation",
    "calorie deficit strategies",
    "body recomposition macros",
    "health nutrition calculators",
    "fasting benefits calculator",
    "anorexia BMI assessment",
    "Subway sandwich nutrition",
  ],
};

export default function PostList() {
  return (
    <main className="mt-10 md:mt-6 mx-auto px-6 max-w-4xl text-center">
      <div className="animated-background rounded-3xl h-[40vh] mb-10">
        <h1 className="text-2xl md:text-4xl text-center font-bold text-white mb-2">
          Calculators
        </h1>
        <p className="block pt-1 text-center text-white">
          Get the numbers that matter.
        </p>
      </div>
      <h2 className="mt-12 mb-16 text-2xl  md:text-4xl  text-black dark:text-white">
        Macros?&nbsp;
        <span className="font-bold text-gradient">Calories?</span>
        &nbsp;Weight?&nbsp;We Have All Kinds Of{" "}
        <span className="font-bold text-gradient">Calculators</span>.
      </h2>
      <h2 className="text-gradient text-2xl  md:text-4xl font-bold mb-2">
        macros and calories calculators
      </h2>
      <span className="block pt-1 text-base">
        This group of calculators simplifies diet tracking for health and
        fitness, offering easy management of daily macros and sugar intake.
        Perfect for anyone focused on effective nutrition and weight control.
      </span>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
        <CalculatorCard
          title="Protein Intake Calculator"
          href="/protein-calculator"
          description="Calculate the optimal protein intake wheter you are on a weight loss, maintain weight or want to build muscle."
          src="/protein-calculator.jpg"
          alt="Protein Intake Calculator"
        />
        <CalculatorCard
          title="Carbs Intake Calculator"
          href="/carbs-calculator"
          description="Calculate the optimal carbs intake wheter you are on a weight loss, maintain weight or want to gain weight."
          src="/carbs-calculator.png"
          alt="Carbs Intake Calculator"
        />
        <CalculatorCard
          title="Fat Intake Calculator"
          href="/fat-calculator"
          description="Calculate the optimal fat intake wheter you are on a weight loss, maintain weight or want to gain weight."
          src="/fat-calculator.png"
          alt="Fat Intake Calculator"
        />
        <CalculatorCard
          title="Sugar Calculator"
          href="/sugar-calculator"
          description="
          How much sugar are you allowed to eat per day. This comes handy if you are on a weight loss."
          src="/sugar-calculator.png"
          alt="Sugar Calculator"
        />
      </div>
      <h2 className="text-gradient text-2xl  md:text-4xl font-bold mb-2">
        weight management calculators
      </h2>
      <span className="block pt-1 text-base">
        These calculators are ideal for individuals aiming to lose, gain, or
        maintain weight. They provide insights into daily calorie needs,
        deficits for weight loss, and body composition changes.
      </span>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
        <CalculatorCard
          title="TDEE Calculator"
          href="/tdee-calculator"
          description="Learn How Many Calories You Burn Every Day Just For Existing."
          src="/tdee-calculator.png"
          alt="TDEE calculator"
        />
        <CalculatorCard
          title="Calorie Deficit Calculator"
          href="/calorie-deficit-calculator"
          description="Efficiently calculate your daily calorie needs for healthy weight management with our user-friendly Calorie Deficit Calculator."
          src="/calorie-deficit.png"
          alt="Calorie Deficit Calculator"
        />
        <CalculatorCard
          title="Body Recomposition Calculator"
          href="/body-recomposition-calculator"
          description="Did you know you can BUILD muscle and BURN fat at the same time? Check calories and body recomposition macros here."
          src="/body-recomposition.png"
          alt="Body Recomposition Calculator"
        />
      </div>
      <h2 className="text-gradient text-2xl  md:text-4xl font-bold mb-2">
        health and nutrition calculators
      </h2>
      <span className="block pt-1 text-base">
        This category includes calculators tailored for specific health-related
        contexts, like monitoring calories in fast-food meals, fasting periods,
        and assessing BMI in the context of anorexia.
      </span>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
        <CalculatorCard
          title="Fasting Calculator"
          href="/fasting-calculator"
          description="Fasting is popular for various reasons: Weight loss, health
          benefits and much more. Let's calculate the calories behind it."
          src="/fasting-calculator.png"
          alt="Fasting Calculator"
        />
        <CalculatorCard
          title="Anorexic BMI Calculator"
          href="/anorexic-calculator"
          description="
          Accurately assess your health with our Anorexia BMI Calculator, a
          critical resource for identifying potential anorexia nervosa based on
          BMI."
          src="/anorexic-calculator.jpg"
          alt="Anorexic BMI Calculator"
        />
        <CalculatorCard
          title="Subway Calorie Calculator"
          href="/subway-calculator"
          description="Calculate the nutrition of your favorite Subway sandwich."
          src="/subway-calculator.jpg"
          alt="Subway calorie nutrition calculator"
        />
      </div>
      <AboutMeSection />
    </main>
  );
}
