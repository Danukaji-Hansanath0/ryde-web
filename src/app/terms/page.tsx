'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { FileText, Car, RotateCcw, Wrench, CalendarClock, CreditCard, ShieldCheck, UserCog, Scale, LucideIcon } from 'lucide-react';

interface SubPoint {
    title: string;
    text?: string;
    bullets?: string[];
}

interface Section {
    icon: LucideIcon;
    title: string;
    intro?: string;
    subpoints?: SubPoint[];
    text?: string;
}

const sections: Section[] = [
    {
        icon: Car,
        title: '1. Vehicle Use Guidelines',
        intro: 'To ensure safety and compliance:',
        subpoints: [
            {
                title: 'Authorized Drivers',
                text: 'Only the lessee and additional drivers approved by Ryde Flexi may operate the vehicle. All drivers must be at least 21 years old and possess a valid driver\'s license held for a minimum of one year.',
            },
            {
                title: 'Prohibited Uses',
                text: 'The vehicle must not be used for:',
                bullets: [
                    'Paid passenger transport.',
                    'Participating in races or competitions.',
                    'Towing other vehicles or trailers.',
                    'Illegal activities or transporting prohibited goods.',
                    'Driving under the influence of alcohol or drugs.',
                    'Carrying more passengers than permitted by the vehicle\'s registration.',
                ],
            },
            {
                title: 'Vehicle Security',
                text: 'Always lock the vehicle when unattended and retain possession of the vehicle\'s documents. Utilize any provided anti-theft devices when parking.',
            },
        ],
    },
    {
        icon: RotateCcw,
        title: '2. Vehicle Condition and Return',
        subpoints: [
            {
                title: 'Condition Upon Return',
                text: 'The vehicle should be returned in the same condition as received. A cleaning fee of EUR 35 will be charged if the vehicle requires cleaning upon return. Smoking inside the vehicle is strictly prohibited.',
            },
            {
                title: 'Restricted Areas',
                text: 'Vehicles are not permitted inside National Parks for safaris or any adventure purposes.',
            },
            {
                title: 'Tyre Maintenance',
                text: 'The vehicle\'s tyres are provided in good condition. Any damage beyond normal wear is the lessee\'s responsibility and must be replaced with tyres of equivalent condition and specifications.',
            },
        ],
    },
    {
        icon: Wrench,
        title: '3. Maintenance and Repairs',
        subpoints: [
            {
                title: 'Routine Maintenance',
                text: 'Ryde Flexi is responsible for normal mechanical wear.',
            },
            {
                title: 'Repairs',
                text: 'Any necessary repairs must be authorized in writing by Ryde Flexi and carried out according to our instructions. Receipts and any replaced defective parts must be submitted for reimbursement consideration.',
            },
        ],
    },
    {
        icon: CalendarClock,
        title: '4. Rental Period and Extensions',
        subpoints: [
            {
                title: 'Rental Duration',
                text: 'The rental period is as specified in the agreement. Extensions require prior approval from Ryde Flexi and must be requested at least three days before the original return date.',
            },
            {
                title: 'Late Returns',
                text: 'Failure to return the vehicle on time without prior notification may result in additional charges and potential legal action.',
            },
        ],
    },
    {
        icon: CreditCard,
        title: '5. Payments and Charges',
        subpoints: [
            {
                title: 'Rental Fees',
                text: 'As per the agreed rate, payable in advance.',
            },
            {
                title: 'Additional Charges',
                text: 'Including but not limited to:',
                bullets: [
                    'Fines or penalties incurred during the rental period.',
                    'Charges for exceeding agreed mileage.',
                    'Costs for returning the vehicle to a location other than agreed upon.',
                    'Taxes and assessments related to the rental.',
                    'Fees for optional services or insurance selected.',
                ],
            },
            {
                title: 'Damage Liability',
                text: 'In the event of damage to the vehicle, the lessee may be liable for repair costs up to the amount specified in the rate list, unless a damage waiver has been purchased.',
            },
        ],
    },
    {
        icon: ShieldCheck,
        title: '6. Insurance and Liability',
        subpoints: [
            {
                title: 'Insurance Provided',
                text: 'Ryde Flexi provides insurance coverage for the vehicle itself, as per the terms stated in the rental agreement. We do not provide insurance for the driver, passengers, or personal belongings.',
            },
            {
                title: "Driver's Responsibility for Insurance",
                text: 'It is the responsibility of the driver to arrange personal travel or health insurance they may require, including coverage for injuries, accidents, or loss of personal belongings.',
            },
            {
                title: 'Damage Responsibility',
                text: 'The lessee is liable for damages resulting from improper use, including driving on unsuitable roads.',
            },
            {
                title: 'Accident Reporting',
                text: 'In the event of an accident, theft, or fire:',
                bullets: [
                    'Report immediately to Ryde Flexi and the local police.',
                    'Provide a detailed written report including circumstances, date, time, location, and witness information.',
                    "Do not admit liability or settle claims without Ryde Flexi's consent.",
                ],
            },
        ],
    },
    {
        icon: UserCog,
        title: "7. Lessee's Responsibilities",
        subpoints: [
            {
                title: 'Legal Compliance',
                text: 'The lessee is responsible for any violations of traffic or other laws during the rental period.',
            },
            {
                title: 'Vehicle Care',
                text: 'Regularly check oil and water levels and ensure the vehicle is fueled appropriately. Fuel costs are the lessee\'s responsibility.',
            },
        ],
    },
    {
        icon: Scale,
        title: '8. Dispute Resolution',
        text: 'Any disputes arising from this agreement will be resolved in accordance with the laws of Sri Lanka. If the lessee is an individual, the court will be chosen according to local law; if not, the court will be chosen based on the location of Ryde Flexi\'s registered office.',
    },
];

export default function TermsPage() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-16">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
                        <FileText className="text-blue-400" size={18} />
                        <span className="text-blue-300 text-sm font-medium">Legal Agreement</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Please read the following terms carefully before renting a vehicle from Ryde Flexi.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">Effective Date: February 24, 2026</p>
                </motion.div>

                {/* Intro Card */}
                <motion.div
                    className="glass-premium p-6 rounded-2xl mb-8 border border-blue-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="text-gray-300 leading-relaxed">
                        Welcome to Ryde Flexi. By renting a vehicle from us, you agree to the following terms and conditions. Please read them carefully to ensure a smooth rental experience.
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={i}
                                className="glass-premium rounded-2xl overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                            >
                                {/* Section Header */}
                                <div className="flex items-center gap-4 p-6 pb-4 border-b border-white/5">
                                    <div className="bg-blue-500/15 p-3 rounded-xl flex-shrink-0">
                                        <Icon className="text-blue-400" size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                                </div>

                                {/* Section Body */}
                                <div className="p-6 pt-4 text-gray-300 leading-relaxed space-y-4">
                                    {section.intro && (
                                        <p className="text-gray-400 text-sm">{section.intro}</p>
                                    )}

                                    {/* Plain text section (e.g. Dispute Resolution) */}
                                    {section.text && (
                                        <p>{section.text}</p>
                                    )}

                                    {/* Sub-points */}
                                    {section.subpoints && section.subpoints.map((sub, j) => (
                                        <div key={j} className="pl-4 border-l-2 border-blue-500/30 space-y-2">
                                            <p className="font-semibold text-white">➤ {sub.title}</p>
                                            {sub.text && <p className="text-gray-300">{sub.text}</p>}
                                            {sub.bullets && sub.bullets.length > 0 && (
                                                <ul className="space-y-1.5 mt-1">
                                                    {sub.bullets.map((bullet, k) => (
                                                        <li key={k} className="flex items-start gap-3">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <motion.p
                    className="text-center text-gray-500 text-sm mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    © {new Date().getFullYear()} Ryde Flexi. All rights reserved.
                </motion.p>
            </div>
        </div>
    );
}
