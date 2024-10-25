import {Box, Button, CircularProgress, Container, Grid2 as Grid, Stack, Typography} from "@mui/material";
import { useConferenceStore } from "../../stores/conference.store.ts";
import { useEffect, useState, useRef } from "react";
import { useGlobalStore } from "../../stores/global.store.ts";
import { DateTime } from 'luxon';

interface Image {
    src: string;
    alt: string;
}

// Определяем интерфейс для пропсов
interface SwipeableImageProps {
    images: Image[]; // Массив изображений
}

// TODO: Уродливый костыль надо пофиксить

import image1 from '../../components/images/IMG_5581.jpg';
import image2 from '../../components/images/IMG_5581.jpg';
import image3 from '../../components/images/IMG_5582.jpg';
import image4 from '../../components/images/IMG_5584.jpg';
import image5 from '../../components/images/IMG_5585.jpg';
import image6 from '../../components/images/IMG_5586.jpg';
import image7 from '../../components/images/IMG_5587.jpg';
import image8 from '../../components/images/IMG_5590.jpg';
import image9 from '../../components/images/IMG_5591.jpg';
import image10 from '../../components/images/photo_5244767466784156973_y.jpg';
import image11 from '../../components/images/photo_5244767466784156974_y.jpg';
import image12 from '../../components/images/photo_5244767466784156975_y.jpg';

const images = [
    { src: image1, alt: "Изображение 1" },
    { src: image2, alt: "Изображение 2" },
    { src: image3, alt: "Изображение 3" },
    { src: image4, alt: "Изображение 4" },
    { src: image5, alt: "Изображение 5" },
    { src: image6, alt: "Изображение 6" },
    { src: image7, alt: "Изображение 7" },
    { src: image8, alt: "Изображение 8" },
    { src: image9, alt: "Изображение 9" },
    { src: image10, alt: "Изображение 10" },
    { src: image11, alt: "Изображение 11" },
    { src: image12, alt: "Изображение 12" },
];

const SwipeableImage: React.FC<SwipeableImageProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX; // Запоминаем начальную позицию касания
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX; // Обновляем конечную позицию касания
    };

    const onTouchEnd = () => {
        const diffX = touchStartX.current - touchEndX.current; // Разница между начальной и конечной позициями

        if (diffX > 50) {
            nextImage(); // Свайп влево
        } else if (diffX < -50) {
            prevImage(); // Свайп вправо
        }
    };

    return (
        <Box
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            sx={{
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
                <p>Нет изображений для отображения</p>
            )}
            <Button
                onClick={prevImage}
                sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)', // Центрируем по вертикали
                    zIndex: 1,
                    margin: '0 -73px',
                    display: { xs: 'none', sm: 'block'  }
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
                    transform: 'translateY(-50%)', // Центрируем по вертикали
                    zIndex: 1,
                    margin: '0 -80px',
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
        return <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
        </Box>
    const confStart = new DateTime(conference.start_date).setLocale('ru').toFormat('d MMMM');

    return (
        <Container>
            <Stack direction="column" gap={2}>
                <Typography variant="h6" color="primary">
                    {conference.grade}
                </Typography>
                <Typography variant="h3">
                    {conference.short_name}
                </Typography>
                <Typography variant="body1" color="text.hint">
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
                    onClick={() => globalStore.setAuthModalOpened(true )}
                >
                    Подать заявку
                </Button>
                <Box width={{xs: "100%", md: "80%"}}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={() => ({ xs: 'column', sm: 'row' })}
                        gap={2}
                    >
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
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
                            <Typography variant="body1" color="text.hint">
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
                            <Typography variant="body1" color="text.hint">
                                Формат конференции
                            </Typography>
                            <Typography variant="body2">
                                {conference.format}
                            </Typography>
                        </Box>

                    </Box>
                    <Grid container py={8}>
                        <Grid size={{xs: 12, md: 7}}>
                            <Typography variant="body1">
                            На кафедре БИТ ИКТИБ проводятся конференции по информационной безопасности.
                            Научно практическая конференция "Информационная безопасность" проводилась с 2003 по 2016 годы.
                            В 2024 году планируется возобновить проведение конференции, присвоив ей
                            имя основателя профессора О.Б. Макаревича
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 0, md: 1}}/>
                        <Grid size={{xs: 12, md: 4}}>
                            <SwipeableImage images={images} />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Container>
    );
}

export default Index;
