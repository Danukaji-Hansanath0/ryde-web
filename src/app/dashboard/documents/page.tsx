'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Upload, FileText, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useState } from 'react';

type DocumentStatus = 'pending' | 'approved' | 'rejected';

interface Document {
    id: number;
    type: string;
    name: string;
    uploadDate: string;
    status: DocumentStatus;
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([
        { id: 1, type: 'Driver\'s License', name: 'license_front.jpg', uploadDate: 'Jan 15, 2026', status: 'approved' },
        { id: 2, type: 'Insurance', name: 'insurance_card.pdf', uploadDate: 'Jan 15, 2026', status: 'pending' },
    ]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (file) {
            // TODO: Implement file upload logic
            const newDoc: Document = {
                id: documents.length + 1,
                type,
                name: file.name,
                uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                status: 'pending'
            };
            setDocuments([...documents, newDoc]);
        }
    };

    const getStatusBadge = (status: DocumentStatus) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-bold flex items-center gap-1">
                        <CheckCircle size={14} />
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-sm font-bold flex items-center gap-1">
                        <XCircle size={14} />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-bold">
                        Pending Review
                    </span>
                );
        }
    };

    const requiredDocuments = [
        { type: 'Driver\'s License (Front)', required: true },
        { type: 'Driver\'s License (Back)', required: true },
        { type: 'Insurance Card', required: false },
        { type: 'Proof of Address', required: false },
    ];

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2">Documents</h1>
                    <p className="text-gray-400">Upload and manage your verification documents</p>
                </motion.div>

                {/* Upload Sections */}
                <div className="space-y-6 mb-8">
                    {requiredDocuments.map((doc, i) => {
                        const uploaded = documents.find(d => d.type === doc.type);
                        return (
                            <motion.div
                                key={i}
                                className="glass-premium p-6 rounded-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            {doc.type}
                                            {doc.required && <span className="text-red-500 text-sm">*</span>}
                                        </h3>
                                        {uploaded && (
                                            <p className="text-gray-400 text-sm mt-1">
                                                Uploaded: {uploaded.name} on {uploaded.uploadDate}
                                            </p>
                                        )}
                                    </div>
                                    {uploaded && getStatusBadge(uploaded.status)}
                                </div>

                                <div className="flex gap-3">
                                    <label className="flex-1 cursor-pointer">
                                        <div className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl p-6 text-center transition-colors">
                                            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                                            <p className="text-sm text-gray-400">
                                                {uploaded ? 'Replace Document' : 'Click to upload or drag and drop'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handleFileUpload(e, doc.type)}
                                        />
                                    </label>
                                    {uploaded && (
                                        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2">
                                            <Eye size={20} />
                                            View
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Info Box */}
                <motion.div
                    className="glass-premium p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <FileText className="text-blue-500" />
                        Document Requirements
                    </h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Documents must be clear and readable</li>
                        <li>• All text and details must be visible</li>
                        <li>• Driver's license must not be expired</li>
                        <li>• Documents are reviewed within 24 hours</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
