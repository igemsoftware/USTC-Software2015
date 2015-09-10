#include <stdlib.h>
#include <memory.h>
#include <math.h>
#include <time.h>
#include <stdio.h>
void *memcpy(void *dest, const void *src, size_t n);
struct current_data
{
  float time;
  long long *numbers;
};
struct reaction_data
{
  int sub_num;
  int *subs;
};
struct reaction_change_data
{
  int reaction_num;
  int *reacs;
};
struct record_data
{
  struct current_data *ans;
  int num;
};
struct record_data simulate(
  float stop_time,
  int species_number,
  int reaction_number,
  long long *current,//initial             long long * species_number
  float *constant,//                             float * reaction_number
  struct reaction_data *reactant_data,//     reaction_data * reaction_number
  struct reaction_data *product_data,
  struct reaction_change_data *reaction_link
  )
{
  float t = 0;
  struct current_data *ans = (struct current_data *)malloc(sizeof(struct current_data));
  ans->time = 0;
  ans->numbers = (long long *)malloc(sizeof(long long)*species_number);
  memcpy(ans->numbers, current, sizeof(long long)*species_number);
  float *possibility = (float *)malloc(species_number*sizeof(float));
  memcpy(possibility, constant, sizeof(float)*species_number);
  float possibility_sum = 0;
  //for(int i=0;i<species_number;i++){printf("%lld ",*(current+i));}
  //printf("\n");
  for(int i = 0;i<reaction_number;i++){
    //printf("%f ",*(possibility+i));
    for(int j = 0;j<(reactant_data+i)->sub_num;j++){
      *(possibility+i) *= *(current+*((reactant_data+i)->subs+j));
      //printf("*currnet[%d](%lld)  ", *((reactant_data+i)->subs+j),*(current+*((reactant_data+i)->subs+j)));
    }
    //printf("%f\n",*(possibility+i));
    possibility_sum += *(possibility+i);
  }
  float randomer;
  int next_reaction;
  float sumer;
  srand(time(NULL));
  int num=1;
  /*for(int i=0;i<reaction_number;i++){
    for(int j=0;j<(reaction_link+i)->reaction_num;j++){
      printf("%d ",(reaction_link+i)->reacs[j]);
    }
    printf("\n");
  }
  for(int i=0;i<reaction_number;i++){printf("%f ", *(constant+i));};puts("\n");////////////*/
  while(t<stop_time){
    printf("%f\t",t);
    for(int i =0;i<species_number;i++)
      {
        printf("%lld ",*(current+i));
      };
    puts("");
    //printf("\t");puts("");
    //printf("%f \t" ,possibility_sum);puts("");
    //printf("%d ",num);
    //puts("start of a while");
    if(possibility_sum<=0){
      //puts("break");
      break;
    }
    t-=log(rand()/(RAND_MAX+1.0))/possibility_sum;
    randomer = rand()/(RAND_MAX+1.0)*possibility_sum;
    sumer = 0;
    next_reaction = 0;
    while(1){
      sumer+=*(possibility+next_reaction);
      if(sumer>=randomer){
        break;
      };
      next_reaction++;
    };
    for(int i=0;i<(reactant_data+next_reaction)->sub_num;i++){
      (*(current+*((reactant_data+next_reaction)->subs+i)))--;
    };
    for(int i=0;i<(product_data+next_reaction)->sub_num;i++){
      (*(current+*((product_data+next_reaction)->subs+i)))++;
    };
    num++;
    //printf("%d\t",num*current_size);
    /*struct current_data *temp = (struct current_data *)malloc(num*current_size);
                    puts("#");
    memcpy(temp, ans, (num-1)*current_size);
                    //puts("#");
    free(ans);
                    //puts("#");
    ans = temp;*/
                         //
    ans = (struct current_data *)realloc(ans,num*sizeof(struct current_data));
    (ans+num-1)->time=t;
                    //printf("%lu\n",species_number*sizeof(long long));
                    //printf("%d\t%f\n",num,t);
    (ans+num-1)->numbers = (long long *)malloc(species_number*sizeof(long long));
                    //puts("#");
    memcpy((ans+num-1)->numbers, current, sizeof(long long)*species_number);
    for(int i=0;i<(reaction_link+next_reaction)->reaction_num;i++){
      possibility_sum-=*(possibility+*((reaction_link+next_reaction)->reacs+i));
      *(possibility+*((reaction_link+next_reaction)->reacs+i))=*(constant+*((reaction_link+next_reaction)->reacs+i));
      for(int j=0;j<(reactant_data+*((reaction_link+next_reaction)->reacs+i))->sub_num;j++){
          *(possibility+*((reaction_link+next_reaction)->reacs+i))*=*(current+*((reactant_data+*((reaction_link+next_reaction)->reacs+i))->subs+j));
        };
      possibility_sum+=*(possibility+*((reaction_link+next_reaction)->reacs+i));
    };
  };
  //free(possibility);
  struct record_data record;
  record.num = num;
  record.ans = ans;
  //puts("simulate done\n");
  return record;
}
