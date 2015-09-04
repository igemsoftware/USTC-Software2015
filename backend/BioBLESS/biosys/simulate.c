//current.,
#include <stdlib.h>
#include <memory.h>
#include <math.h>
#include <time.h>
void *memcpy(void *dest, const void *src, size_t n);
struct crt_data
{
    float time;
    long long *numbers
};
struct rct_data
{
    int sub_num;
    int *subs;
};
struct rct_change
{
    int reac_num;
    int *reacs;
};
struct crt_data *simulate(
    float stop_time,
    int species_number,
    int reaction_number,
    long long *current,//initial             long long * species_number
    float *constant,//                             float * reaction_number
    struct rct_data *reactant_data,//     rct_data * reaction_number
    struct rct_data *product_data
    struct rct_chang *rct_link;
    )
{
    float time = 0;
    int crt_size = sizeof(struct crt_data);
    int num_size = sizeof(long long)*species_number;
    struct crt_data *ans = malloc(crt_size);
    ans->time = 0;
    ans->numbers = malloc(num_size);
    memcpy(ans->numbers, current, num_size);
    float *possibility = malloc(sizeof(long long));
    memcpy(possibility, constant, num_size);
    float possibility_sum = 0;
    for(int i = 0;i<reaction_number;i++){
        for(int j = 0;j<(reactant_data+i)->sub_num;j++){
            *(possibility+i) *= *(current+j);
        }
        possibility_sum += *(possibility+i);
    }
    float randomer;
    int next_reaction;
    float sumer;
    srand(time(NULL));
    int num=0;
    while(time<stop_time){
        if(possibility_sum==0):
            break;
        time-=log(rand()/RAND_MAX)/possibility_sum;
        randomer = rand()/RAND_MAX*possibility_sum
        sumer = 0;
        next_reaction = 0;
        while(1){
            sumer+=*(possibility+next_reaction);
            if(sumer>=randomer){
                break;
            };
            next_reaction++
        };
        for(int i=0;(reactant_data+next_reaction)->sub_num;i++){
            *(current+*((reactant_data+next_reaction)->subs+i))--;
        };
        for(int i=0;(product_data+next_reaction)->sub_num;i++){
            *(current+*((product_data+next_reaction)->subs+i))++;
        };
        num++;
        ans=realloc(ans,(num+1)*crt_size);
        (ans+num)->time=time;
        memcpy((ans+num)->numbers, current, num_size);
        for(int i=0;i<(rct_link+next_reaction)->reac_num;i++){
            possibility_sum-=*(possibility+*((rct_link+next_reaction)->reacs+i))
            *(possibility+*((rct_link+next_reaction)->reacs+i))=*(constant+*((rct_link+next_reaction)->reacs+i))
            for(int j=0;j<(reactant_data+*(constant+*((rct_link+next_reaction)->reacs+i)))->sub_num;j++){
                *(possibility+*((rct_link+next_reaction)->reacs+i))*=*(current+*((reactant_data+*(constant+*((rct_link+next_reaction)->reacs+i)))->subs+j))
            };
            possibility_sum+=*(possibility+*((rct_link+next_reaction)->reacs+i))
        };
    };
    return ans;
}