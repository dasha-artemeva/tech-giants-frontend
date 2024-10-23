import { Box, Button, CircularProgress, Container, Stack, Typography, useTheme } from "@mui/material";
import { useConferenceStore } from "../../stores/conference.store.ts";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../stores/global.store.ts";
import { DateTime } from 'luxon';
import { useSwipeable } from 'react-swipeable';

interface Image {
    src: string;
    alt: string;
}

// Определяем интерфейс для пропсов
interface SwipeableImageProps {
    images: Image[]; // Массив изображений
}

const images = [
    { src: '../src/components/images/IMG_5580.jpg', alt: "Изображение 1" },
    { src: '../src/components/images/IMG_5581.jpg', alt: "Изображение 2" },
    { src: '../src/components/images/IMG_5582.jpg', alt: "Изображение 3" },
    { src: '../src/components/images/IMG_5584.jpg', alt: "Изображение 4" },
    { src: '../src/components/images/IMG_5585.jpg', alt: "Изображение 5" },
    { src: '../src/components/images/IMG_5586.jpg', alt: "Изображение 6" },
    { src: '../src/components/images/IMG_5587.jpg', alt: "Изображение 7" },
    { src:  '../src/components/images/IMG_5590.jpg', alt: "Изображение 8" },
    { src: '../src/components/images/IMG_5591.jpg', alt: "Изображение 9" },
    { src: '../src/components/images/photo_5244767466784156973_y.jpg', alt: "Изображение 10" },
    { src: '../src/components/images/photo_5244767466784156974_y.jpg', alt: "Изображение 11" },
    { src: '../src/components/images/photo_5244767466784156975_y.jpg', alt: "Изображение 12" },
];

const SwipeableImage: React.FC<SwipeableImageProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => nextImage(),
        onSwipedRight: () => prevImage(),
        trackMouse: true,
    });

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box
            {...handlers}
            sx={{
                width: { xs: '100%', sm: '400px' },
                height: { xs: '200px', sm: '400px' },
                marginLeft: "100px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
            }}
        >
            {images.length > 0 ? (
                <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
                />
            ) : (
                <Typography variant="body1">Нет изображений для отображения</Typography>
            )}
            <Button
                onClick={prevImage}
                sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' }
                }}
            >
                Назад
            </Button>
            <Button
                onClick={nextImage}
                sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                Вперед
            </Button>
        </Box>
    );
};

export function Index() {
    const conference = useConferenceStore(state => state.conference);
    const refreshConference = useConferenceStore(state => state.refresh);

    useEffect(() => {
        refreshConference().then(null);
    }, []);

    const globalStore = useGlobalStore();
    if (!conference)
        return (
            <Box display="flex" justifyContent="center" py={5}>
                <CircularProgress />
            </Box>
        );

    const confStart = DateTime.fromISO(conference.start_date).setLocale('ru').toFormat('d MMMM');

    return (
        <Container>
            <Stack direction="column" gap={2}>
                <Typography variant="h6" color="primary">
                    {conference.grade}
                </Typography>
                <Typography variant="h3">
                    {conference.short_name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {conference.name}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        maxWidth: {
                            sm: '30%'
                        }
                    }}
                    onClick={() => globalStore.setAuthModalOpened(true)}
                >
                    Подать заявку
                </Button>
                <Box width="80%">
                    <Box
 display="flex"
                        justifyContent="space-between"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        gap={2}
                    >
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.secondary">
                                Начало
                            </Typography>
                            <Typography variant="body2">
                                {confStart}
                            </Typography>
                        </Box>
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.secondary">
                                Продолжительность
                            </Typography>
                            <Typography variant="body2">
                                {conference.duration}
                            </Typography>
                        </Box>
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.secondary">
                                Формат конференции
                            </Typography>
                            <Typography variant="body2">
                                {conference.format}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center', }}>
                        <Box sx={{ flex: 1, }}>
                            <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui. Donec sed odio dui.
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui. Donec sed odio dui.
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui. Donec sed odio dui.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, maxWidth: { xs: '100%', sm: '400px' }, display: 'flex', justifyContent: 'center', marginLeft: "-100px" }}>
                            {/* Фотогалерея */}
                            <SwipeableImage images={images} />
                        </Box>

                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}

export default Index;
