"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
    mainImage: string
    images: string[]
    productName: string
    description?: string
}

export default function ProductImageGallery({
    mainImage,
    images = [],
    productName,
    description,
}: ProductImageGalleryProps) {
    // Combine main image with additional images for the gallery
    const allImages = [mainImage, ...images].filter(Boolean)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const goToNext = () => {
        setActiveImageIndex((prev) => (prev + 1) % allImages.length)
    }

    const goToPrevious = () => {
        setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image Display */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-zoom-in border" onClick={() => setIsOpen(true)}>
                <Image
                    src={allImages[activeImageIndex] || "/placeholder.jpg"}
                    alt={productName}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                >
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={cn(
                                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-gray-50",
                                activeImageIndex === index ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-gray-300"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${productName} view ${index + 1}`}
                                fill
                                className="object-contain p-1"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-white/95 backdrop-blur-sm border-none shadow-2xl flex flex-col items-center justify-center">
                    <DialogTitle className="sr-only">Galerie photo de {productName}</DialogTitle>
                    <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center p-4">
                        <Image
                            src={allImages[activeImageIndex]}
                            alt={productName}
                            fill
                            className="object-contain p-4 md:p-8"
                        />
                        {/* ... Navigation Controls ... */}
                    </div>

                    <div className="w-full bg-white/95 p-6 md:p-8 border-t">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{productName}</h2>
                            {description && (
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {description}
                                </p>
                            )}

                            {/* Lightbox Thumbnails/Status Area */}
                            {allImages.length > 1 && (
                                <div className="flex flex-col items-center gap-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        {activeImageIndex + 1} / {allImages.length}
                                    </p>
                                    <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
                                        {allImages.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveImageIndex(index)}
                                                className={cn(
                                                    "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                                                    activeImageIndex === index ? "border-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"
                                                )}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
