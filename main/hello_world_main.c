#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

void app_main(void)
{

    while (1)
    {

        printf("SHORT CIRCUIT detected between P3 and P7\n");

        vTaskDelay(pdMS_TO_TICKS(3000));
    }
}