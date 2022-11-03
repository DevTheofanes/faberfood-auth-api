-- AlterTable
ALTER TABLE `user` ADD COLUMN `user_classification_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `user_classification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_user_classification_id_fkey` FOREIGN KEY (`user_classification_id`) REFERENCES `user_classification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
