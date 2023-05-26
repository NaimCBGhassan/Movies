export interface Review {
  userId: string;
  content: string;
  mediaType: string;
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
  id: string;
}

export interface ReviewPopulate {
  userId: {
    username: string;
    displayName: string;
    id: string;
  };
  content: string;
  mediaType: string;
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
  id: string;
  createdAt: Date;
}
