//
//  Created by Viki.
//  Copyright (c) 2014 Viki Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "VKVideoPlayer.h"

@interface DemoVideoPlayerViewController : UIViewController<
  VKVideoPlayerDelegate
>

@property (nonatomic, strong) VKVideoPlayer* player;

@end
