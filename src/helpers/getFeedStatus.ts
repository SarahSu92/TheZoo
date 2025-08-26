export const getFeedStatus = (
  lastFed: string | null | undefined,
  type: "detail" | "overview" = "detail"
) => {
  if (!lastFed) {
    return {
      canFeed: true,
      status: "hungrig",
      warning: type === "detail" ? "Djuret har aldrig fått mat!" : "Behöver matas nu!",
    };
  }

  const now = new Date();
  const lastFedTime = new Date(lastFed);
  const diffHours = (now.getTime() - lastFedTime.getTime()) / 1000 / 60 / 60;

  if (type === "detail") {
    return {
      canFeed: diffHours >= 4,
      status: diffHours >= 4 ? "hungrig" : "mätt",
      warning: diffHours >= 3 && diffHours < 4 ? "Djuret behöver snart matas!" : "",
    };
  } else {
    let status: "mätt" | "hungrig" | "desperat behov" = "mätt";
    let warning = "";

    if (diffHours >= 5) {
      status = "desperat behov";
      warning = "Behöver matas nu!";
    } else if (diffHours >= 3) {
      status = "hungrig";
      warning = "Snart behöver matas";
    }

    // Feed can be activated after four hours
    const canFeed = diffHours >= 4;

    return {
      status,
      warning,
      canFeed,
    };
  }
};