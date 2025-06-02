export class Routes {
  static dashboard = "/dashboard";
  static projects = "/dashboard/projects";
  static contests = "/dashboard/contests";
  static creators = "/dashboard/creators";
  static messages = "/dashboard/messages";
  static transactions = "/dashboard/transactions";
  static aiUgc = "/dashboard/ai-ugc";
  static newAiUgc = "/dashboard/ai-ugc/new";
  static settings = "/dashboard/settings";
  static help = "/dashboard/help";
}

export class QueryKeys {
  static defaultAvatars = "default-avatars";
  static savedAvatars = "saved-avatars";
  static generationStatus = "generation-status";
}

export class Collections {
  static avatars = "avatars";
  static savedAvatars = "saved_avatars";
  static defaultAvatars = "default_avatars";
}

export class AvatarSource {
  static generated = "generated";
  static uploaded = "uploaded";
  static default = "default";
}

export const ICON_SIZE = 20;
