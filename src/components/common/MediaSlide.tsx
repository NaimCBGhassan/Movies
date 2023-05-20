import { useEffect } from "react";
import { TMDB } from "../../types/tmdb";
import { SwiperSlide } from "swiper/react";
import * as MediaApi from "../../store/api/media";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import { isErrorWithMessage } from "../../utils/errorNarrowing";

const MediaSlide = ({ mediaType, mediaCategory }: Pick<TMDB, "mediaType" | "mediaCategory">) => {
  const { data: medias, error } = MediaApi.useGetListQuery({ mediaType, mediaCategory, page: "1" });

  useEffect(() => {
    if (error && isErrorWithMessage(error)) toast.error(error.message);
  }, [error]);

  return (
    <AutoSwiper>
      {medias?.results.map((media, index) => (
        <SwiperSlide key={index}>
          <div>Hola</div>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
