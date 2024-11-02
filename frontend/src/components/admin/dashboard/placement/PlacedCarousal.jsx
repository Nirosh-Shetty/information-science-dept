import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent } from "../../../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function PlacedCarousal() {
  const theme = useTheme();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Shadow color adjustment based on theme mode
  const boxShadowColor =
    theme.palette.mode === "dark"
      ? "0 4px 10px rgba(255, 255, 255, 0.1)"
      : "0 4px 10px rgba(0, 0, 0, 0.1)";

  return (
    <Carousel
      plugins={[plugin.current]}
      style={{
        height: "18rem",
        maxWidth: "80rem",
        margin: "auto",
        padding: "1rem",
        paddingRight : "",
        borderRadius: "10px",
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="flex">
        {Array.from({ length: 15 }).map((_, index) => (
          <CarouselItem key={index} className="px-2 md:basis-1/2 lg:basis-1/3">
            <div style={{ padding: "1rem" }}>
              <Card
                style={{
                  boxShadow: boxShadowColor,
                  borderRadius: "10px", // Optional: Add border-radius for rounded card corners
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "14rem", // Adjusted height for content fit
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                  }}
                >
                  {index + 1}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent >
      <CarouselPrevious  />
      <CarouselNext />  
    </Carousel>
  );
}
