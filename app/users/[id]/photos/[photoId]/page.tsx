import React from "react";

interface Props {
  params: { id: number; photoId: number };
}

const UserPhotoDetail = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      UserPhotoDetail {id} {photoId}
    </div>
  );
};

export default UserPhotoDetail;
