 c o n s t   {   s e n d R c o n C o m m a n d   }   =   r e q u i r e ( ' . . / u t i l s / r c o n U t i l s ' ) ; 
 
 m o d u l e . e x p o r t s   =   { 
         n a m e :   ' s t o p ' , 
         d e s c r i p t i o n :   ' I - s h u t d o w n   a n g   M i n e c r a f t   s e r v e r . ' , 
         a s y n c   e x e c u t e ( m e s s a g e )   { 
                 t r y   { 
                         / /   M a g p a d a l a   n g   w a r n i n g   s a   l a h a t   n g   p l a y e r s   b a g o   i - s h u t d o w n 
                         a w a i t   s e n d R c o n C o m m a n d ( ' s a y  �=��   S e r v e r   s h u t t i n g   d o w n   i n   1 0   s e c o n d s ! ' ) ; 
                         m e s s a g e . c h a n n e l . s e n d ( '&��   * * B a b a l a : * *   A n g   s e r v e r   a y   m a g s a s a r a   s a   l o o b   n g   1 0   s e g u n d o . ' ) ; 
 
                         / /   M a g h i n t a y   n g   1 0   s e g u n d o   b a g o   i s a r a   a n g   s e r v e r 
                         s e t T i m e o u t ( a s y n c   ( )   = >   { 
                                 t r y   { 
                                         c o n s t   r e s p o n s e   =   a w a i t   s e n d R c o n C o m m a n d ( ' s t o p ' ) ; 
                                         m e s s a g e . c h a n n e l . s e n d ( ''   * * M a t a g u m p a y ! * *   A n g   s e r v e r   a y   i s i n a r a . ' ) ; 
                                         c o n s o l e . l o g ( r e s p o n s e ) ; 
                                 }   c a t c h   ( e r r o r )   { 
                                         c o n s o l e . e r r o r ( e r r o r ) ; 
                                         m e s s a g e . c h a n n e l . s e n d ( ''L   * * E r r o r : * *   N a b i g o   a n g   p a g - s h u t d o w n   n g   s e r v e r . ' ) ; 
                                 } 
                         } ,   1 0 0 0 0 ) ; 
                 }   c a t c h   ( e r r o r )   { 
                         c o n s o l e . e r r o r ( e r r o r ) ; 
                         m e s s a g e . c h a n n e l . s e n d ( ''L   * * E r r o r : * *   H i n d i   m a - e x e c u t e   a n g   s t o p   c o m m a n d . ' ) ; 
                 } 
         } 
 } ; 
