
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface AdItem {
  id: string;
  image: string;
  productId: string;
  title: string;
}

const adsData: AdItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop',
    productId: '1',
    title: 'Premium Wireless Headphones'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop',
    productId: '2',
    title: 'Smart Fitness Watch'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
    productId: '3',
    title: 'Professional Camera'
  }
];

const AdsCarousel: React.FC = () => {
  return (
    <div className="w-full mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {adsData.map((ad) => (
            <CarouselItem key={ad.id}>
              <Link to={`/product/${ad.productId}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 className="text-white text-xl font-bold">{ad.title}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AdsCarousel;
