import { useState } from "react";
import {
    Check,
    ChefHat,
    Circle,
    BadgeCheck,
    BarChart3
} from "lucide-react";

const steps = [
    {
        id: "received",
        title: "Received",
        icon: <Check />,
    },
    {
        id: "preparing",
        title: "Preparing",
        icon: <ChefHat />,
    },
    {
        id: "ready",
        title: "Ready",
        icon: <Circle fill="currentColor" />,
    },
    {
        id: "completed",
        title: "Completed",
        icon: <BadgeCheck />,
    },
];

export default function OrderProgress() {

    const [currentStep, setCurrentStep] = useState(1);

    return (

        <div className="overflow-x-auto max-w-[1200px] styled-scrollbar styled-scroll bg-white rounded-lg border border-gray-300 p-4">

            {/* Header */}

            <div className="flex items-center gap-3 mb-10">

                <BarChart3 className="text-primary" />

                <h2 className="text-xl font-medium">
                    Order Progress
                </h2>

            </div>

            <div className="relative flex min-w-[700px] items-start justify-between gap-4 md:gap-8">

                {/* line */}

                <div className="absolute top-6 left-8 right-8 h-[3px] bg-neutral-200" />

                <div
                    className="absolute top-6 left-8 h-[3px] bg-primary transition-all duration-500"
                    style={{
                        width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 4rem)`
                    }}
                />

                {steps.map((step, index) => {

                    const active = index <= currentStep;

                    return (

                        <div
                            key={step.id}
                            className="relative z-10 flex min-w-[150px] flex-col items-center text-center"
                        >

                            <div
                                className={`
                                    w-12 h-12 rounded-full border-4 flex items-center justify-center transition
                                    ${active
                                        ? "bg-primary border-primary text-white"
                                        : "bg-white border-neutral-300 text-neutral-300"    
                                    }
                                `}
                            >
                                {step.icon}
                            </div>

                            <h3
                                className={`
                                    mt-5 font-medium text-lg
                                    ${active
                                        ? "text-primary"
                                        : "text-neutral-400"
                                    }
                                `}
                            >
                                {step.title}
                            </h3>

                            <p className="text-neutral-500 mt-2">
                                {active ? "10:22 AM" : "Waiting..."}
                            </p>

                            {/* Admin Action */}

                            <button
                                disabled={active}
                                onClick={() => setCurrentStep(index)}
                                className={`
                                    mt-6 px-5 py-2 rounded-xl font-medium transition

                                    ${active
                                        ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                        : "bg-primary text-white hover:bg-primary/90"
                                    }
                                `}
                            >
                                Notify {step.title}
                            </button>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}