"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"
import clsx from "clsx"
import { CloudDownload, CloudUpload, Upload } from "lucide-react"
import { ICON_SIZE } from "@/constants"

const avatarOptions = [
    {
        label: "Default Avatars",
        description: "Select from a gallery of pre-generated avatars",
    },
    {
        label: "Upload Avatar",
        description: "Upload a selfie or face image",
    },
    {
        label: "Generate by Prompt",
        description: "Type a description to create a custom avatar",
    },
]

const Page = () => {
    const [selectedOption, setSelectedOption] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [uploadedAvatar, setUploadedAvatar] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setUploadedAvatar(imageUrl)
        }
    }

    const handleRemoveUpload = () => {
        setUploadedAvatar(null)
    }

    return (
        <DashboardLayout label="Create New AI Ad">
            <div className="px-4 py-2 border rounded-lg bg-white">
                <h1 className="text-xl md:text-2xl">Choose Your AI Avatar</h1>
                <p>Pick or create a face to represent your brand's UGC ad.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    {avatarOptions.map((option, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "p-4 border rounded-lg cursor-pointer transition-colors",
                                selectedOption === index
                                    ? "border-orange-500 ring-2 ring-orange-300"
                                    : "border-gray-200"
                            )}
                            onClick={() => setSelectedOption(index)}
                        >
                            <label className="flex items-start space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="avatarOption"
                                    checked={selectedOption === index}
                                    onChange={() => setSelectedOption(index)}
                                    className="accent-orange-500 mt-1"
                                />
                                <div>
                                    <p className="font-medium">{option.label}</p>
                                    <small className="text-gray-400">{option.description}</small>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                {/* Default Avatars */}
                {selectedOption === 0 && (
                    <div>
                        <div className="border rounded-lg p-4">
                            <p>Default Avatars</p>
                            <small className="text-gray-400">Browse and select from ready-to-use faces.</small>

                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <div
                                        key={`default-${index}`}
                                        className={clsx(
                                            "w-14 h-14 rounded-md flex items-center justify-center text-sm cursor-pointer transition-all",
                                            selectedAvatar === `default-${index}`
                                                ? "border-2 border-orange-500 bg-orange-100"
                                                : "bg-gray-300"
                                        )}
                                        onClick={() => setSelectedAvatar(`default-${index}`)}
                                        tabIndex={0}
                                    >
                                        <span className="text-xs text-white">{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 mt-4">
                            <p>My Saved Avatars</p>
                            <small className="text-gray-400">Reuse your previously generated or uploaded avatars</small>

                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={`saved-${index}`}
                                        className={clsx(
                                            "w-14 h-14 rounded-md flex items-center justify-center text-sm cursor-pointer transition-all",
                                            selectedAvatar === `saved-${index}`
                                                ? "border-2 border-orange-500 bg-orange-100"
                                                : "bg-gray-300"
                                        )}
                                        onClick={() => setSelectedAvatar(`saved-${index}`)}
                                        tabIndex={0}
                                    >
                                        <span className="text-xs text-white">{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Avatar */}
                {selectedOption === 1 && (
                    <div>
                        <div className="border rounded-lg p-4 flex flex-col items-center">
                            <CloudUpload size={ICON_SIZE} />

                            <div className="flex gap-2">
                                <label className="cursor-pointer text-cOrange">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    Click to upload
                                </label>
                                <p className="text-gray-400">or drag and drop</p>
                            </div>
                            <p className="text-gray-400 text-sm ">PNG or JPG (max. 800x400px)</p>


                        </div>
                        <div className="mt-4">
                            {uploadedAvatar ? (
                                <div className="flex flex-col items-start gap-4">
                                    <img
                                        src={uploadedAvatar}
                                        alt="Uploaded Avatar"
                                        className="w-28 h-28 object-cover rounded-lg border-2 border-orange-500"
                                    />
                                    <button
                                        onClick={handleRemoveUpload}
                                        className="text-red-500 text-sm underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Page
