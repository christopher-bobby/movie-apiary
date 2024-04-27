import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { FC } from "react";

const FavButton: FC<{
  isFavorite: boolean;
  onAddFavourite?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ isFavorite, onAddFavourite }) => {
  return (
    <Button onClick={onAddFavourite}>
      {isFavorite ? (
        <>
          <LikeOutlined style={{ color: "#1F51FF" }} /> <span>Like me!</span>
        </>
      ) : (
        <>
          <DislikeOutlined style={{ color: "red" }} /> <span>Remove me</span>
        </>
      )}
    </Button>
  );
};

export default FavButton;
