//
//  Created by Viki.
//  Copyright (c) 2014 Viki Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DemoHTTPStreamingServer : NSObject

+ (instancetype)sharedInstance;

- (void)start;
- (void)stop;

@end
